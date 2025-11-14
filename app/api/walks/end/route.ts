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

    // Actualizar XP del perro
    const xpEarned = duration >= 15 ? 20 : 10
    
    await prisma.dog.update({
      where: { id: session.user.dog.id },
      data: {
        xp: { increment: xpEarned },
      },
    })

    return NextResponse.json({ walkId: walk.id, xpEarned })
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

