import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'
import { isLive } from '@/lib/isLive'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const room = await prisma.room.findUnique({
      where: { id: params.id },
      include: {
        sessions: {
          include: {
            speakers: { include: { speaker: true } },
            event: true,
          },
          orderBy: { startTime: 'asc' },
        },
      },
    })
    if (!room) return sendError('Salle introuvable', 404)

    // Ajouter le flag isLive sur chaque session
    const roomWithLive = {
      ...room,
      sessions: room.sessions.map((s) => ({
        ...s,
        isLive: isLive(s.startTime, s.endTime),
      })),
    }
    return sendSuccess(roomWithLive)
  } catch {
    return sendError('Erreur serveur')
  }
}
