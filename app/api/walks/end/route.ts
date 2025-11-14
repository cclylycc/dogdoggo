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

    const { walkId, duration } = await req.json()

    const walk = await prisma.walkRecord.update({
      where: { id: walkId },
      data: {
        endTime: new Date(),
        duration,
      },
    })

    // Calcular XP basado en duración
    let xpEarned = 10 // Base XP
    if (duration >= 15) {
      xpEarned = 20 // Tarea diaria completada
    }
    if (duration >= 30) {
      xpEarned = 30 // Bonus por paseo largo
    }
    
    // Actualizar XP del perro
    const updatedDog = await prisma.dog.update({
      where: { id: session.user.dog.id },
      data: {
        xp: { increment: xpEarned },
      },
    })

    // Verificar si completó tareas
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Obtener total de minutos de walks hoy
    const allTodayWalkRecords = await prisma.walkRecord.findMany({
      where: {
        dogId: session.user.dog.id,
        startTime: { gte: today }
      },
      select: { duration: true }
    })
    const todayWalkRecords = allTodayWalkRecords.filter(record => record.duration !== null)
    const totalMinutesToday = todayWalkRecords.reduce((sum, record) => sum + (record.duration || 0), 0)

    // Verificar tareas completadas
    const tasksCompleted = []
    if (totalMinutesToday >= 15) {
      tasksCompleted.push('Pasear 15 minutos')
    }

    // Verificar nivel (cada 100 XP = 1 nivel)
    const newLevel = Math.floor(updatedDog.xp / 100) + 1
    const leveledUp = newLevel > (session.user.dog.level || 1)

    return NextResponse.json({ 
      walkId: walk.id, 
      xpEarned,
      tasksCompleted,
      leveledUp,
      newLevel: leveledUp ? newLevel : undefined,
      totalMinutesToday
    })
  } catch (error) {
    console.error('Error finalizando paseo:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

