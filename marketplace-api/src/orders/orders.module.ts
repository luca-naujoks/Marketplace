import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [PrismaService, OrdersService]
})
export class OrdersModule {}
