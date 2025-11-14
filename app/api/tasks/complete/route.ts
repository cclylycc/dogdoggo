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

    const { taskId, taskXp } = await req.json()

    // Actualizar XP del perro
    const updatedDog = await prisma.dog.update({
      where: { id: session.user.dog.id },
      data: {
        xp: { increment: taskXp },
      },
    })

    // Calcular nivel (cada 100 XP = 1 nivel)
    const oldLevel = Math.floor((updatedDog.xp - taskXp) / 100) + 1
    const newLevel = Math.floor(updatedDog.xp / 100) + 1
    const leveledUp = newLevel > oldLevel

    // Si subió de nivel, actualizar el nivel en la base de datos
    if (leveledUp) {
      await prisma.dog.update({
        where: { id: session.user.dog.id },
        data: { level: newLevel }
      })
    }

    return NextResponse.json({ 
      success: true,
      xpEarned: taskXp,
      totalXp: updatedDog.xp,
      leveledUp,
      newLevel: leveledUp ? newLevel : oldLevel,
      oldLevel
    })
  } catch (error) {
    console.error('Error completando tarea:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

