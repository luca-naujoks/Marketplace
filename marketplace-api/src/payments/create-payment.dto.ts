export class CreatePaymentDto {
  readonly provider: string;
  readonly card_number: number;
  readonly cvc: number;
  readonly card_holder_name: string;
  readonly card_holder_id: number;
  readonly expires: string;
}

export class UpdatePaymentDto {
  readonly provider?: string;
  readonly card_number?: number;
  readonly cvc?: number;
  readonly card_holder_name?: string;
  readonly expires?: string;
}