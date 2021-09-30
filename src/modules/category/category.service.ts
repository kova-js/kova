import { CategoryModel } from '@/models/category'
import { PrismaService } from '@/prisma'
import { Injectable } from '@nestjs/common'
import { Category, Prisma } from '@prisma/client'
import { plainToClass } from 'class-transformer'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategory(
    CategoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput,
  ): Promise<CategoryModel | null> {
    const data = await this.prisma.category.findUnique({
      where: CategoryWhereUniqueInput,
    })

    return plainToClass(CategoryModel, data)
  }

  async categories(
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.CategoryWhereUniqueInput
      where?: Prisma.CategoryWhereInput
      orderBy?: Prisma.CategoryOrderByWithAggregationInput
    } = {},
  ): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params

    const data = await this.prisma.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })

    return plainToClass(CategoryModel, data)
  }

  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({
      data,
    })
  }

  async updateCategory(params: {
    where: Prisma.CategoryWhereUniqueInput
    data: Prisma.CategoryUpdateInput
  }): Promise<Category> {
    const { where, data } = params
    return this.prisma.category.update({
      data,
      where,
    })
  }

  async deleteCategory(where: Prisma.CategoryWhereUniqueInput): Promise<Category> {
    return this.prisma.category.delete({
      where,
    })
  }
}
