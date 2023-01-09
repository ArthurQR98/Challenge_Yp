import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID('all', { message: '$property -> $value debe ser un uuid valido' })
  @IsNotEmpty({ message: '$property -> Es requerido' })
  accountExternalIdDebit: string;

  @IsUUID('all', { message: '$value debe ser un uuid valido' })
  @IsNotEmpty({ message: '$property -> Es requerido' })
  accountExternalIdCredit: string;

  @IsNumber({}, { message: '$property debe ser un nùmero' })
  @IsNotEmpty({ message: '$property -> Es requerido' })
  tranferTypeId: number;

  @IsNumber({}, { message: '$property debe ser un nùmero' })
  @IsNotEmpty({ message: '$property -> Es requerido' })
  value: number;
}
