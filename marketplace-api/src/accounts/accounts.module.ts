import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { PrismaService } from 'src/prisma.service';
import { AccountsService } from './accounts.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';


@Module({
    imports: [],
    controllers: [AccountsController],
    providers: [PrismaService, AccountsService, AuthService, JwtService],
})

export class AccountsModule {}
