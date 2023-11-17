import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AccountsModule } from 'src/accounts/accounts.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    AccountsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy , AccountsService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}