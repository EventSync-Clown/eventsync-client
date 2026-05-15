import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'

// PATCH /api/questions/:id/upvote
export async function PATCH(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const question = await prisma.question.update({
      where: { id: params.id },
      data:  { upvotes: { increment: 1 } },
    })
    return sendSuccess(question)
  } catch {
    return sendError('Question introuvable', 404)
  }
}
