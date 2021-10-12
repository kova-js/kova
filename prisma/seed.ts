import { PrismaClient } from '@prisma/client'

import { loadConfig } from 'ssr-server-utils'
const config: any = loadConfig()

async function createPosts() {
  const prisma = new PrismaClient({
    datasources: {
      db: config.config.database,
    },
  })

  prisma.$use(async (params, next) => {
    const before = Date.now()

    const result = await next(params)

    const after = Date.now()

    console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)

    return result
  })
  try {
    let lastUser = await prisma.user.findFirst({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
      },
    })
    if (!lastUser) {
      lastUser = await prisma.user.create({
        data: {
          password: '1',
          name: 'loyep',
          slug: 'loyep',
        },
      })
    }
    const lastUserId = lastUser.id
    const lastPost = await prisma.post.findFirst({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
      },
    })
    const lastPostId = (lastPost?.id || 0) + 1
    await prisma.post.createMany({
      skipDuplicates: true,
      data: new Array(100).fill(null).map((item, index) => ({
        title: '1',
        slug: `test-${index + lastPostId}`,
        image: '',
        excerpt: '',
        cover: '',
        categoryId: 1,
        userId: lastUser.id,
      })),
    })
  } catch (error) {
    console.log(error)
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
