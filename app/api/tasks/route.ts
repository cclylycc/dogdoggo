import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.dog?.id) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Obtener tareas del sistema
    const systemTasks = await prisma.task.findMany({
      where: {
        OR: [
          { type: 'DAILY' },
          { type: 'WEEKLY' }
        ]
      }
    })

    // Obtener el progreso del usuario para cada tarea (usando WalkRecord para walks)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    weekAgo.setHours(0, 0, 0, 0)

    // Contar walks de hoy
    const todayWalks = await prisma.walkRecord.count({
      where: {
        dogId: session.user.dog.id,
        startTime: { gte: today }
      }
    })

    // Contar walks de esta semana
    const weekWalks = await prisma.walkRecord.count({
      where: {
        dogId: session.user.dog.id,
        startTime: { gte: weekAgo }
      }
    })

    // Obtener total de minutos de walks hoy
    const allTodayWalkRecords = await prisma.walkRecord.findMany({
      where: {
        dogId: session.user.dog.id,
        startTime: { gte: today }
      },
      select: { duration: true }
    })
    const todayWalkRecords = allTodayWalkRecords.filter(record => record.duration !== null)
    const todayMinutes = todayWalkRecords.reduce((sum, record) => sum + (record.duration || 0), 0)

    // Crear lista de tareas con progreso
    const tasks = [
      {
        id: '1',
        title: 'Pasear 15 minutos',
        xp: 20,
        type: 'DAILY',
        completed: todayMinutes >= 15,
        progress: Math.min(100, Math.round((todayMinutes / 15) * 100)),
        current: todayMinutes,
        target: 15
      },
      {
        id: '2',
        title: 'Completar 1 lección',
        xp: 15,
        type: 'DAILY',
        completed: false,
        progress: 0,
        current: 0,
        target: 1
      },
      {
        id: '3',
        title: 'Publicar en Social',
        xp: 10,
        type: 'DAILY',
        completed: false,
        progress: 0,
        current: 0,
        target: 1
      },
      {
        id: '4',
        title: 'Pasear 5 veces',
        xp: 50,
        type: 'WEEKLY',
        completed: weekWalks >= 5,
        progress: Math.min(100, Math.round((weekWalks / 5) * 100)),
        current: weekWalks,
        target: 5
      },
      {
        id: '5',
        title: 'Agregar 3 amigos',
        xp: 30,
        type: 'WEEKLY',
        completed: false,
        progress: 0,
        current: 0,
        target: 3
      }
    ]

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('Error obteniendo tareas:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.dog?.id) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { taskId } = await req.json()

    // Aquí puedes manejar la lógica de completar tareas manualmente si es necesario
    // Por ahora, las tareas se completan automáticamente basadas en acciones

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

