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
import { Prisma, Products, Products as ProductsModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

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
    const brandid: number | undefined = brandid_raw
      ? parseInt(brandid_raw, 10)
      : undefined;
    const rating: number | undefined = rating_raw
      ? parseInt(rating_raw, 10)
      : undefined;
    const startPrice: number | undefined = startPrice_raw
      ? parseInt(startPrice_raw, 10)
      : undefined;
    const endPrice: number | undefined = endPrice_raw
      ? parseInt(endPrice_raw, 10)
      : undefined;

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
        listed: true,
      },
    });
    return products;
  }

  @UseGuards(JwtAuthGuard)
  @Get('business')
  async getCompanyProducts(
    @Query('category') category: string,
    @Query('brandid') brandid_raw: string,
    @Query('rating') rating_raw: string,
    @Query('startPrice') startPrice_raw: string,
    @Query('endPrice') endPrice_raw: string,
  ): Promise<ProductsModel[]> {
    const brandid: number | undefined = brandid_raw
      ? parseInt(brandid_raw, 10)
      : undefined;
    const rating: number | undefined = rating_raw
      ? parseInt(rating_raw, 10)
      : undefined;
    const startPrice: number | undefined = startPrice_raw
      ? parseInt(startPrice_raw, 10)
      : undefined;
    const endPrice: number | undefined = endPrice_raw
      ? parseInt(endPrice_raw, 10)
      : undefined;

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

  @Get(':id')
  async getProductsById(@Param('id') id: string): Promise<ProductsModel> {
    return this.productsService.findProduct(id)
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
      listed: boolean;
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
      tags,
      listed,
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
      listed,
    };

    return this.productsService.createproduct(data);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
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
  ): Promise<Products> {
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
      tags,
    } = productData;

    const data: Prisma.ProductsUpdateInput = {
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

    return this.productsService.updateProduct({
      where: { id: Number(id) },
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/publish')
  async publish(@Param('id') id: string): Promise<Products> {
    return this.productsService.publish(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Products> {
    return this.productsService.deleteProduct(id);
  }
}
