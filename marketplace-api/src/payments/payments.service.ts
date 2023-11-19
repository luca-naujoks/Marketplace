import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePaymentDto, UpdatePaymentDto } from './create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async find(account_id: number) {
    return this.prisma.payments.findMany({
      where: {
        card_holder_id: account_id
      }
    })
  }

  async create(accountId: number, createPaymentDto: CreatePaymentDto) {
    return this.prisma.payments.create({
      data: {
        ...createPaymentDto,
        card_holder_id: accountId,
      },
    });
  }

  async update(account_id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.prisma.payments.update({
      where: { id: account_id },
      data: updatePaymentDto,
    })
  }

}