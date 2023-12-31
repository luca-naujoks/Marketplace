import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AccountsModule } from './accounts/accounts.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsController } from './products/products.controller';
import { AccountsController } from './accounts/accounts.controller';
import { OrdersController } from './orders/orders.controller';
import { PrismaService } from './prisma.service';
import { ProductsService } from './products/products.service';
import { AccountsService } from './accounts/accounts.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { OrdersService } from './orders/orders.service';
import { PaymentsService } from './payments/payments.service';
import { PaymentsController } from './payments/payments.controller';

@Module({
  imports: [ProductsModule, AccountsModule, OrdersModule, AuthModule],
  controllers: [
    AppController,
    ProductsController,
    AccountsController,
    OrdersController,
    PaymentsController,
  ],
  providers: [
    AppService,
    ProductsService,
    OrdersService,
    PaymentsService,
    PrismaService,
    AccountsService,
    JwtService,
  ],
})
export class AppModule {}
