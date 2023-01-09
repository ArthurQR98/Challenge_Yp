import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TransactionEntity } from '@challenge/shared/entity';
import { MAX_VALUE } from './constants';

@Injectable()
export class AppService {
  constructor(
    @Inject('TRANSACTION_MICROSERVICE')
    private readonly anti_fraudClient: ClientKafka
  ) {}

  validate(payload: Partial<TransactionEntity>): void {
    if (payload.value > MAX_VALUE) {
      this.anti_fraudClient.emit(
        'invalid_transaction',
        JSON.stringify(payload)
      );
    }
    this.anti_fraudClient.emit('valid_transaction', JSON.stringify(payload));
  }
}
