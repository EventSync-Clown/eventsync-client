import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const question = await prisma.question.findUnique({
      where: { id: params.id },
    })

    if (!question) {
      return sendError('Question not found', 404)
    }

    const updatedQuestion = await prisma.question.update({
      where: { id: params.id },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    })

    return sendSuccess(updatedQuestion)
  } catch (error) {
    console.error('Error upvoting question:', error)
    return sendError('Failed to upvote question', 500)
  }
}