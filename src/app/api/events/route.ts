import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        sessions: {
          include: {
            room: true,
            speakers: { include: { speaker: true } },
          },
          orderBy: { startTime: 'asc' },
        },
      },
      orderBy: { startDate: 'asc' },
    })
    return sendSuccess(events)
  } catch {
    return sendError('Erreur serveur')
  }
}
