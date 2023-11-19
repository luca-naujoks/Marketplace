import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Accounts, Prisma } from '@prisma/client';

interface Password {
  password: string
}

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async getaccounts({
    accountsWhereUniqueInput,
  }: {
    accountsWhereUniqueInput: Prisma.AccountsWhereUniqueInput;
  }): Promise<Accounts | null> {
    return this.prisma.accounts.findUnique({
      where: accountsWhereUniqueInput,
    });
  }

  async createaccount(data: Prisma.AccountsCreateInput): Promise<Accounts> {
    return this.prisma.accounts.create({
      data,
    });
  }

  async updateAccount(params: {
    where: Prisma.AccountsWhereUniqueInput;
    data: Prisma.AccountsUpdateInput
  }): Promise<Accounts> {
    const { where, data } = params;
    return this.prisma.accounts.update({
      data,
      where
    })
  }

  async changePassword(id: number, password: string) {
    return await this.prisma.accounts.update({
      where: { id: id },
      data: { password: password}
    })
  }
  
  async findAccountByEmail(email: string): Promise<Accounts> {
    return this.prisma.accounts.findUnique({ where: { email } });
  }
}

