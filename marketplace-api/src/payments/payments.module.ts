import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [],
    controllers: [PaymentsController],
    providers: [PrismaService, PaymentsService],
  })
  export class PaymentsModule {}