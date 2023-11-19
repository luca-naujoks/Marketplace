// OrdersService
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Orders, Prisma } from '@prisma/client';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto): Promise<Orders> {
    const { items, ...orderData } = data;
    const createdOrder = await this.prisma.orders.create({
      data: {
        ...orderData,
        items: {
          create: items,
        },
      },
      include: {
        items: true,
      },
    });

    return createdOrder;
  }

  async findOrders(buyerId: string, sellerId: string): Promise<Orders[]> {
    let where: Prisma.OrdersWhereInput = {};
  
    if (buyerId && sellerId) {
      where = {
        OR: [
          { buyerId: parseInt(buyerId) },
          { sellerId: parseInt(sellerId) },
        ],
      };
    } else if (buyerId) {
      where.buyerId = parseInt(buyerId);
    } else if (sellerId) {
      where.sellerId = parseInt(sellerId);
    }
  
    return this.prisma.orders.findMany({
      where,
      include: {
        items: true,
      },
    });
  }
  
}
