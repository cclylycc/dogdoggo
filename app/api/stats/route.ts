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

    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    weekAgo.setHours(0, 0, 0, 0)

    // Obtener walks de esta semana con duration
    const allWeekWalkRecords = await prisma.walkRecord.findMany({
      where: {
        dogId: session.user.dog.id,
        startTime: { gte: weekAgo }
      },
      select: { duration: true }
    })
    
    // Filtrar los que tienen duration
    const weekWalkRecords = allWeekWalkRecords.filter(record => record.duration !== null)

    // Calcular estadísticas
    const weekWalks = weekWalkRecords.length
    const weekMinutes = weekWalkRecords.reduce((sum, record) => sum + (record.duration || 0), 0)

    // Contar posts de esta semana (mock por ahora)
    const weekPosts = 0

    // Contar lecciones completadas esta semana (mock por ahora)
    const weekLessons = 0

    return NextResponse.json({
      stats: {
        walks: weekWalks,
        minutes: weekMinutes,
        posts: weekPosts,
        lessons: weekLessons
      }
    })
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

