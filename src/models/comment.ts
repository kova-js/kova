import { Comment as PrismaComment } from '@prisma/client'

export class CommentModel implements PrismaComment {
  id: number
  articleId: number
  userId: number
  createdAt: Date
  updatedAt: Date
}
