import { UseCase } from '../../libs/contracts/use-case';
import { Transaction } from '@prisma/client';
import { TransactionRepositoryPort } from '../../domain/transaction/port/persistence/transaction.repository';

export class FindTransaction implements UseCase<string, Partial<Transaction>> {
  constructor(
    private readonly transactionRepository: TransactionRepositoryPort
  ) {}

  async execute(id: string): Promise<Partial<Transaction>> {
    const transaction = await this.transactionRepository.findTransaction(id);
    return transaction;
  }
}
