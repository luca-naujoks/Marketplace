import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  Request,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PaymentsService } from './payments.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreatePaymentDto, UpdatePaymentDto } from './create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly prisma: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findMethods(@Request() req) {
    return this.paymentsService.find(req.user.account_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(req.user.account_id, createPaymentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Request() req, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(
      Number(req.user.account_id),
      updatePaymentDto,
    );
  }
}
