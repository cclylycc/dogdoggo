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

    const { dogId } = await req.json()

    const walk = await prisma.walkRecord.create({
      data: {
        dogId,
        startTime: new Date(),
      },
    })

    return NextResponse.json({ walkId: walk.id })
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

