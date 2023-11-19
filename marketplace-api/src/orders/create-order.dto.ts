export class CreateOrderDto {
    readonly date: string;
    readonly items: {
      readonly productid: number;
      readonly name: string;
      readonly price: number;
      readonly amount: number;
    }[];
    readonly buyerId: number;
    readonly sellerId: number;
  }
  