import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Products, Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getproducts(
  { productsWhereUniqueInput }: { productsWhereUniqueInput: Prisma.ProductsWhereUniqueInput; },
  ): Promise<Products | null> {
    return this.prisma.products.findUnique({
      where: productsWhereUniqueInput,
    });
  };

  async createproduct(data: Prisma.ProductsCreateInput): Promise<Products> {
    return this.prisma.products.create({
      data,
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductsWhereUniqueInput;
    data: Prisma.ProductsUpdateInput;
  }): Promise<Products> {
    const { data, where } = params;
    return this.prisma.products.update({
      data,
      where,
    });
  }
}
