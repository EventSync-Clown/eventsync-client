import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'

export async function GET() {
  try {
    const now = new Date()
    const sessions = await prisma.session.findMany({
      where: {
        startTime: { lte: now },
        endTime:   { gte: now },
      },
      include: {
        room: true,
        event: true,
        speakers:  { include: { speaker: true } },
        questions: { orderBy: { upvotes: 'desc' } },
      },
    })
    return sendSuccess(sessions)
  } catch {
    return sendError('Erreur serveur')
  }
}
