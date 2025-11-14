import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, dogName, dogBreed, dogGender, dogBirthDate } = body

    // Validar datos
    if (!email || !password || !dogName || !dogBreed || !dogGender || !dogBirthDate) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 400 }
      )
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Calcular edad del perro
    const birthDate = new Date(dogBirthDate)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    // Crear usuario y perro en una transacción
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        dog: {
          create: {
            name: dogName,
            breed: dogBreed,
            gender: dogGender,
            birthDate: new Date(dogBirthDate),
            age,
            personalityScores: {
              extroversion: 50,
              energyLevel: 50,
              sensitivity: 50,
              friendliness: 50,
              trainability: 50,
            },
          },
        },
      },
      include: {
        dog: true,
      },
    })

    return NextResponse.json(
      { 
        success: true,
        message: 'Usuario creado exitosamente',
        userId: user.id,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    )
  }
}

