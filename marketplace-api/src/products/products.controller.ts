import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { Prisma, Products as ProductsModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async getProducts(
    @Query('category') category: string,
    @Query('brandid') brandid_raw: string,
    @Query('rating') rating_raw: string,
    @Query('startPrice') startPrice_raw: string,
    @Query('endPrice') endPrice_raw: string,
  ): Promise<ProductsModel[]> {

    const brandid: number | undefined = brandid_raw ? parseInt(brandid_raw, 10) : undefined;
    const rating: number | undefined = rating_raw ? parseInt(rating_raw, 10) : undefined;
    const startPrice: number | undefined = startPrice_raw ? parseInt(startPrice_raw, 10) : undefined;
    const endPrice: number | undefined = endPrice_raw ? parseInt(endPrice_raw, 10) : undefined;

    const products = await this.prisma.products.findMany({
      where: {
        type: category,
        brand_id: brandid,
        rating: {
          gte: rating,
        },
        price: {
          gte: startPrice,
          lte: endPrice,
        },
      },
    });
    return products;
  }

  @Post()
  async createproduct(
    @Body()
    productData: {
      name: string;
      description: string;
      rating: number;
      price: number;
      stock: number;
      delivery_time: number;
      discount: number;
      type: string;
      brand_id: number;
      special_sale: number;
      tags: any;
    },
  ): Promise<ProductsModel> {
    const {
      name,
      description,
      rating,
      price,
      stock,
      delivery_time,
      discount,
      type,
      brand_id,
      special_sale,
      tags
    } = productData;

    const data: Prisma.ProductsCreateInput = {
      name,
      description,
      rating,
      price,
      stock,
      delivery_time,
      discount,
      type,
      brand_id,
      special_sale,
      tags,
    };

    return this.productsService.createproduct(data);
  }

  @Put()
  async editproduct() {}

  @Delete()
  async removeproduct() {}

  @Get(':id')
  async getProductsById(@Param('id') id: String): Promise<ProductsModel> {
    return this.productsService.getproducts({
      productsWhereUniqueInput: { id: Number(id) },
    });
  }
}
