import { UseCase } from '../../libs/contracts/use-case';
import { Transaction } from '@prisma/client';
import { TransactionRepositoryPort } from '../../domain/transaction/port/persistence/transaction.repository';
import { UpdateTransactionPort } from '../../domain/transaction/port/use-case/update-transaction';

export class UpdateTransaction
  implements UseCase<UpdateTransactionPort, Partial<Transaction>>
{
  constructor(
    private readonly transactionRepository: TransactionRepositoryPort
  ) {}

  async execute({
    data,
    statusId,
  }: UpdateTransactionPort): Promise<Partial<Transaction>> {
    return this.transactionRepository.updateTransaction(
      data.transactionExternalId,
      statusId
    );
  }
}
