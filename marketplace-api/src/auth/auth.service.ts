import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async validateAccount(email: string, pass: string): Promise<any> {
    const account = await  this.accountsService.getaccounts({
        accountsWhereUniqueInput: { email: String(email) },
      });
    if (account && await bcrypt.compare(pass, account.password)) {
      const { password, ...result } = account;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const private_payload = { id: user.id, first_name: user.first_name, last_name: user.last_name, adress: user.adress, zip: user.zip, email: user.email, type: user.type };
    const business_payload = { company_id: user.id, company_name: user.company_name, company_type: user.company_type ,first_name: user.first_name, last_name: user.last_name, adress: user.adress, zip: user.zip, email: user.email, type: user.type }
    
    if (user.type === "private") {
      return { access_token: this.jwtService.sign(private_payload)}
    }
    else {
      return {access_token: this.jwtService.sign(business_payload)}
    }
  }

  async sign(payload: any) {
    return this.jwtService.sign(payload)
  }
}
