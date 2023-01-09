import { TransactionRepositoryPort } from '../../domain/transaction/port/persistence/transaction.repository';
import { UseCase } from '../../libs/contracts/use-case';
import { Transaction } from '@prisma/client';
import { CreateTransactionDto } from '@challenge/shared/dto';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { TransactionTokens } from '../../domain/transaction/token';

export class CreateTransaction
  implements UseCase<CreateTransactionDto, Partial<Transaction>>
{
  constructor(
    @Inject(TransactionTokens.AntiFraudMicroservice)
    private readonly transactionClient: ClientKafka,
    private readonly transactionRepository: TransactionRepositoryPort
  ) {}

  async execute(payload: CreateTransactionDto): Promise<Partial<Transaction>> {
    const transaction = await this.transactionRepository.storeTransaction(
      payload
    );

    this.transactionClient.emit(
      'is_valid_transaction',
      JSON.stringify(transaction)
    );
    return transaction;
  }
}
