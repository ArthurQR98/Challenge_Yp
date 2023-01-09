import { CreateTransactionDto } from '@challenge/shared/dto';
import { TransactionEntity } from '@challenge/shared/entity';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('TRANSACTION_MICROSERVICE')
    private readonly transactionClient: ClientKafka
  ) {}

  async transaction_created(data: CreateTransactionDto, res) {
    this.transactionClient
      .send('transaction_create', JSON.stringify(data))
      .subscribe((transaction: TransactionEntity) => {
        res.status(201).send({ ...transaction });
      });
  }

  async transaction(id: string, res) {
    this.transactionClient
      .send('transaction_find', JSON.stringify({ id }))
      .subscribe((transaction: TransactionEntity) => {
        res.status(200).send({ ...transaction });
      });
  }

  async onModuleInit() {
    this.transactionClient.subscribeToResponseOf('transaction_create');
    this.transactionClient.subscribeToResponseOf('transaction_find');
    await this.transactionClient.connect();
  }
}
