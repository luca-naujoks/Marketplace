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
      },
      select: {
        provider: true,
        card_number: true,
        card_holder_name: true,
        expires: true
      }
    }).then(payments => payments.map(payment => ({
      ...payment,
      card_number: String(payment.card_number).slice(8)
    })));
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