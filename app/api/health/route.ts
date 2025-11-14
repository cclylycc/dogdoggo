import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.dog?.id) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const body = await req.json()
    const { type, weight, date, notes } = body

    const record = await prisma.healthRecord.create({
      data: {
        dogId: session.user.dog.id,
        type: type.toUpperCase(),
        date: new Date(date),
        weight: weight ? parseFloat(weight) : null,
        notes,
      },
    })

    // Dar XP por registrar salud
    await prisma.dog.update({
      where: { id: session.user.dog.id },
      data: { xp: { increment: 5 } },
    })

    return NextResponse.json({ success: true, record })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

