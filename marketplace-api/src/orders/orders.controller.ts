import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './create-order.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOrders(@Request() req) {
    return this.ordersService.getMyOrders(parseInt(req.user.account_id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('business')
  findBusinessOrders(@Request() req) {
    return this.ordersService.getBusinessOrders(parseInt(req.user.account_id));
  }
}
