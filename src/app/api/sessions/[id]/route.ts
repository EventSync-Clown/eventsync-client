import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'
import { isLive } from '@/lib/isLive'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await prisma.session.findUnique({
      where: { id: params.id },
      include: {
        room: true,
        event: true,
        speakers:  { include: { speaker: true } },
        questions: { orderBy: { upvotes: 'desc' } },
      },
    })
    if (!session) return sendError('Session introuvable', 404)

    return sendSuccess({
      ...session,
      isLive: isLive(session.startTime, session.endTime),
    })
  } catch {
    return sendError('Erreur serveur')
  }
}
