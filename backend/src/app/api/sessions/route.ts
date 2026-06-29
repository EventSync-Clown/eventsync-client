import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'
import { isLive } from '@/lib/isLive'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('eventId')
    const roomId = searchParams.get('roomId')

    const where: any = {}
    if (eventId) where.eventId = eventId
    if (roomId) where.roomId = roomId

    const sessions = await prisma.session.findMany({
      where,
      include: {
        room: true,
        speakers: {
          include: {
            speaker: true,
          },
        },
        event: true,
      },
      orderBy: {
        startTime: 'asc',
      },
    })

    const sessionsWithLive = sessions.map((session) => ({
      ...session,
      isLive: isLive(session.startTime, session.endTime),
    }))

    return sendSuccess(sessionsWithLive)
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return sendError('Failed to fetch sessions', 500)
  }
}