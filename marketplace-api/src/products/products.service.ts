import { Injectable, NotFoundException } from '@nestjs/common';
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

  async publish(id: string): Promise<Products> {
    const product = await this.prisma.products.findUnique({
      where: { id: Number(id) },
    });
  
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  
    return this.prisma.products.update({
      where: { id: Number(id) },
      data: { listed: !product.listed },
    });
  }

  async deleteProduct(id: string): Promise<Products> {
    const product = await this.prisma.products.findUnique({
      where: { id: Number(id) },
    });
  
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  
    return this.prisma.products.delete({
      where: { id: Number(id) },
    });
  }

  async findProduct(id: string): Promise<Products> {
    const product = await this.prisma.products.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return(product)
  }
  
}
