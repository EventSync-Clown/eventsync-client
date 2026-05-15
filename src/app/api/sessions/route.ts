import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const eventId = searchParams.get('eventId')
    const roomId  = searchParams.get('roomId')

    const sessions = await prisma.session.findMany({
      where: {
        ...(eventId ? { eventId } : {}),
        ...(roomId  ? { roomId  } : {}),
      },
      include: {
        room: true,
        event: true,
        speakers: { include: { speaker: true } },
      },
      orderBy: { startTime: 'asc' },
    })
    return sendSuccess(sessions)
  } catch {
    return sendError('Erreur serveur')
  }
}
