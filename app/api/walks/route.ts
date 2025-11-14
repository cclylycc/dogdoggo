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

    const walks = await prisma.walkRecord.findMany({
      where: { dogId: session.user.dog.id },
      orderBy: { startTime: 'desc' },
      take: 10,
    })

    return NextResponse.json({ walks })
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

