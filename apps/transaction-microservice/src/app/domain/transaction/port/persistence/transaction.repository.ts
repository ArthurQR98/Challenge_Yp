import { Transaction } from '@prisma/client';
import { CreateTransactionDto } from '@challenge/shared/dto';

export interface TransactionRepositoryPort {
  storeTransaction(
    payload: CreateTransactionDto
  ): Promise<Partial<Transaction>>;
  updateTransaction(
    transactionId: string,
    statusId: number
  ): Promise<Transaction>;
  findTransaction(id: string): Promise<Partial<Transaction>>;
}
