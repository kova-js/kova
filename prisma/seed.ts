import { PrismaClient } from '@prisma/client'

async function createPosts() {
  const prisma = new PrismaClient()

  prisma.$use(async (params, next) => {
    const before = Date.now()

    const result = await next(params)

    const after = Date.now()

    console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)

    return result
  })
  try {
    const lastUser = await prisma.post.findFirst({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
      },
    })
    const lastUserId = lastUser.id + 1
    await prisma.post.createMany({
      skipDuplicates: true,
      data: new Array(1000).fill(null).map((item, index) => ({
        title: '1',
        slug: `test-${index + lastUserId}`,
        image: '',
        excerpt: '',
        cover: '',
        categoryId: 1,
        userId: 1,
      })),
    })
  } catch (error) {
  } finally {
    await prisma.$disconnect()
  }
}

async function main() {
  await createPosts()
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {})
