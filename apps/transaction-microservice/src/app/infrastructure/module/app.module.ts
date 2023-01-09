import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppController } from '../../app.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionTokens } from '../../domain/transaction/token';
import { TransactionRepository } from '../persistence/prisma/repository/transaction.repository';
import { CreateTransaction } from '../../use-case/transaction/create';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UpdateTransaction } from '../../use-case/transaction/update-status';
import { FindTransaction } from '../../use-case/transaction/find-transaction';

const persistenceProvider: Provider[] = [
  {
    provide: TransactionTokens.Repository,
    useClass: TransactionRepository,
  },
];

const useCaseProvider: Provider[] = [
  {
    provide: TransactionTokens.RegisterTransactionUseCase,
    useFactory: (transactionClient, transactionRepository) =>
      new CreateTransaction(transactionClient, transactionRepository),
    inject: [
      TransactionTokens.AntiFraudMicroservice,
      TransactionTokens.Repository,
    ],
  },
  {
    provide: TransactionTokens.FindTransactionUseCase,
    useFactory: (transactionRepository) =>
      new FindTransaction(transactionRepository),
    inject: [TransactionTokens.Repository],
  },
  {
    provide: TransactionTokens.UpdateTransactionUseCase,
    useFactory: (transactionRepository) =>
      new UpdateTransaction(transactionRepository),
    inject: [TransactionTokens.Repository],
  },
];

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        KAFKA_BROKER_URL: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: TransactionTokens.AntiFraudMicroservice,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'anti-fraud',
              brokers: [configService.getOrThrow('KAFKA_BROKER_URL')],
            },
            producerOnlyMode: true,
            consumer: {
              groupId: 'anti-fraud-consumer',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [...persistenceProvider, ...useCaseProvider, PrismaService],
})
export class AppModule {}
