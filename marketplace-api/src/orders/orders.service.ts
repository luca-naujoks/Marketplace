// OrdersService
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Orders, Items, Products } from '@prisma/client';
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
  
  //Gets all Orders from an Account Business & Private
  async getMyOrders(account_id: number): Promise<Orders[]> {
    return this.prisma.orders.findMany({
      where: { buyerId: account_id },
      include: { items: true },
    });
  }
  //Gets all Ordered Products the company sells
  async getBusinessOrders(account_id: number): Promise<any[]> {
    const products = await this.prisma.products.findMany({
      where: {
        brand_id: account_id,
      },
    });

    const productIds = products.map((product) => product.id);

    const items = await this.prisma.items.findMany({
      where: {
        productid: {
          in: productIds,
        },
      },
    });

    const itemsWithOrderDate = await Promise.all(
      items.map(async (item) => {
        const order = await this.prisma.orders.findUnique({
          where: {
            id: item.orderId,
          },
        });

        const formattedDate = order.date.toISOString().split('T')[0];

        return {
          ...item,
          orderDate: formattedDate,
        };
      }),
    );

    return itemsWithOrderDate;
  }

  async getBusinessBillings(account_id: number): Promise<{ companySoldItems: any[], companyOrders: any[] }> {
    const products = await this.prisma.products.findMany({
      where: {
        brand_id: account_id,
      },
    });
  
    const productIds = products.map((product) => product.id);
  
    const items = await this.prisma.items.findMany({
      where: {
        productid: {
          in: productIds,
        },
      },
    });
  
    const itemsWithOrderData = await Promise.all(
      items.map(async (item) => {
        const order = await this.prisma.orders.findUnique({
          where: {
            id: item.orderId,
          },
        });
  
        const formattedDate = order.date.toISOString().split('T')[0];
  
        return {
          ...item,
          orderDate: formattedDate,
          buyerId: order.buyerId,
        };
      }),
    );
  
    const companySoldItems = itemsWithOrderData.filter(
      (item) => item.buyerId !== account_id,
    );
  
    const companyOrders = await this.prisma.orders.findMany({
      where: {
        buyerId: account_id,
      },
      include: { items: true },
    });
  
    return {
      companySoldItems,
      companyOrders,
    };
  }
  
}
