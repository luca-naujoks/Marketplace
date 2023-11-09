import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { Accounts, Accounts as AccountsModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { sendMail } from '../mails/nodemailer';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { jwtDecode } from 'jwt-decode';

interface QueryResult {
  id: number;
  company_name: string;
}

interface Password {
  password: string;
}

type AccountResponse =
  | AccountsModel
  | { message: string }
  | { access_token: string };

@Controller('Accounts')
export class AccountsController {
  constructor(
    private readonly AccountsService: AccountsService,
    private readonly prisma: PrismaService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAllAccounts(
    @Query('type') account_type: string,
  ): Promise<Accounts[]> {
    const Accounts = await this.prisma.accounts.findMany({
      where: {
        type: account_type,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return Accounts;
  }

  @Get('/business')
  async getBusinessAccounts(
    @Query('type') account_type: string,
  ): Promise<QueryResult[]> {
    const Accounts = await this.prisma.accounts.findMany({
      where: {
        type: account_type,
      },
      orderBy: {
        id: 'asc',
      },
      select: {
        id: true,
        company_name: true,
      },
    });
    return Accounts;
  }

  @Post()
  async createaccount(
    @Body()
    accountData: {
      type: string;
      email: string;
      password: string;
      first_name: string;
      last_name: string;
      adress: string;
      zip: number;
      company_name: string;
      company_type: string;
      owned_items: [];
      verified: boolean;
    },
  ): Promise<AccountResponse> {
    const existingAccount = await this.AccountsService.findAccountByEmail(
      accountData.email,
    );

    if (existingAccount) {
      return { message: 'An account with this email already exists.' };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(accountData.password, saltRounds);

    accountData.password = hashedPassword;
    const newAccount = await this.AccountsService.createaccount(accountData);
    const { access_token } = await this.authService.login(newAccount);

    return { access_token: access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async editaccount(
    @Body()
    params: {
      where: Prisma.AccountsWhereUniqueInput;
      data: Prisma.AccountsUpdateInput;
    },
  ): Promise<any> {
    const id = params.where.id;
    await this.AccountsService.updateAccount(params);

    const i = await this.AccountsService.getaccounts({
      accountsWhereUniqueInput: { id: Number(id) },
    });

    const business_payload = {
      company_id: i.id,
      company_name: i.company_name,
      company_type: i.company_type,
      first_name: i.first_name,
      last_name: i.last_name,
      adress: i.adress,
      zip: i.zip,
      email: i.email,
      type: i.type,
    };
    const private_payload = {
      id: i.id,
      first_name: i.first_name,
      last_name: i.last_name,
      adress: i.adress,
      zip: i.zip,
      email: i.email,
      type: i.type,
    };

    return {
      access_token: await this.authService.sign(
        i.type === 'business' ? business_payload : private_payload,
      ), statusCode: 200
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeaccount() {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getAccountById(@Param('id') id: string): Promise<AccountsModel> {
    return this.AccountsService.getaccounts({
      accountsWhereUniqueInput: { id: Number(id) },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('password/:id')
  async getAccountPassword(@Param('id') id: string): Promise<Password> {
    return this.AccountsService.getpassword({
      accountsWhereUniqueInput: { id: Number(id) },
    });
  }

  @Post('forgot-password')
  async forgotpassword(
    @Body()
    data: {
      email: string;
    },
  ): Promise<any> {
    const accountData = await this.AccountsService.getaccounts({
      accountsWhereUniqueInput: { email: data.email },
    });

    if (!accountData) {
      return {
        message: 'Successfully send an email to your email adress',
        statusCode: 200,
      };
    }

    const accountPayload = { id: accountData.id };
    const token = await this.authService.sign(accountPayload);
    const secure_url = `http://localhost:3001/reset-password?token=${token}`;

    sendMail(
      data.email,
      'Reset Marketplace Password',
      secure_url,
      accountData.first_name,
    );

    return {
      message: 'Successfully send an email to your email adress',
      statusCode: 200,
    };
  }

  @Post('reset-password')
  async resetpassword(
    @Body()
    accountData: {
      token: string;
      password: string;
    },
  ): Promise<any> {
    const saltRounds = 10;

    let decode: any;
    try {
      decode = jwt.verify(accountData.token, process.env.JWT_SECRET);
    } catch (err) {
      return {
        message: 'Invalid or expired token',
        statusCode: 401,
      };
    }

    const hashedPassword = await bcrypt.hash(accountData.password, saltRounds);

    this.AccountsService.changePassword(decode.id, hashedPassword);

    return {
      message:
        'Your password has been reset and you can now log in with your new password.',
      statusCode: 200,
    };
  }
  @UseGuards(JwtAuthGuard)
  @Post('renew-token')
  async renewtoken(
    @Body()
    data: {
      token: string;
    },
  ) {
    let decode: any;
    try {
      decode = jwt.verify(data.token, process.env.JWT_SECRET);
    } catch (err) {
      return {
        message: 'Invalid or expired tokens can not be renewed',
        statuscode: 401,
      };
    }

    const payload = jwtDecode<any>(data.token);

    delete payload.iat;
    delete payload.exp;

    const newtoken = await this.authService.sign(payload);

    return { newtoken: newtoken };
  }
}
