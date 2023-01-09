import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class TransactionEntity {
  @IsUUID('all', { message: '$property -> $value debe ser un uuid valido' })
  @IsNotEmpty({ message: '$property -> Es requerido' })
  transactionExternalId: string;

  @IsUUID('all', { message: '$property -> $value debe ser un uuid valido' })
  @IsNotEmpty({ message: '$property -> Es requerido' })
  accountExternalIdDebit: string;

  @IsUUID('all', { message: '$property -> $value debe ser un uuid valido' })
  @IsNotEmpty({ message: '$property -> Es requerido' })
  accountExternalIdCredit: string;

  @IsNumber({}, { message: '$property debe ser un nùmero' })
  @IsNotEmpty({ message: '$property -> Es requerido' })
  value: number;

  @IsNumber({}, { message: '$property debe ser un nùmero' })
  statusId: number;

  @IsNumber({}, { message: '$property debe ser un nùmero' })
  @IsNotEmpty({ message: '$property -> Es requerido' })
  typeId: number;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
