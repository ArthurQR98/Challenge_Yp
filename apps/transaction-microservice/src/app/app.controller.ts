import { CreateTransactionDto } from '@challenge/shared/dto';
import { TransactionEntity } from '@challenge/shared/entity';
import { Controller, ValidationPipe, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionTokens } from './domain/transaction/token';
import { APPROVED, REJECTED } from './libs/common/constants';
import { CreateTransaction } from './use-case/transaction/create';
import { FindTransaction } from './use-case/transaction/find-transaction';
import { UpdateTransaction } from './use-case/transaction/update-status';

@Controller()
export class AppController {
  constructor(
    @Inject(TransactionTokens.RegisterTransactionUseCase)
    private readonly registerTransaction: CreateTransaction,
    @Inject(TransactionTokens.UpdateTransactionUseCase)
    private readonly updateTransaction: UpdateTransaction,
    @Inject(TransactionTokens.FindTransactionUseCase)
    private readonly findTransaction: FindTransaction
  ) {}

  @MessagePattern('transaction_create')
  async handleTransactionCreate(
    @Payload(ValidationPipe) payload: CreateTransactionDto
  ) {
    const transaction = await this.registerTransaction.execute(payload);
    return { value: transaction };
  }

  @MessagePattern('transaction_find')
  async handleTransactionFind(@Payload('id') id) {
    const transaction = await this.findTransaction.execute(id);
    return { value: transaction };
  }

  @EventPattern('valid_transaction')
  async handleValidTransaction(
    @Payload(ValidationPipe) payload: Partial<TransactionEntity>
  ) {
    return this.updateTransaction.execute({
      data: payload,
      statusId: APPROVED,
    });
  }

  @EventPattern('invalid_transaction')
  async handleInvalidTransaction(
    @Payload(ValidationPipe) payload: Partial<TransactionEntity>
  ) {
    return this.updateTransaction.execute({
      data: payload,
      statusId: REJECTED,
    });
  }
}
