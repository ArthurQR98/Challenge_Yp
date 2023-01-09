import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        KAFKA_BROKER_URL: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: 'TRANSACTION_MICROSERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'transaction',
              brokers: [configService.getOrThrow('KAFKA_BROKER_URL')],
            },
            producerOnlyMode: true,
            consumer: {
              groupId: 'transaction-consumer',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
