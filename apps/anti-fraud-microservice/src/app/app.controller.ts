import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TransactionEntity } from '@challenge/shared/entity';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('is_valid_transaction')
  async handleTransactionValidate(
    @Payload(ValidationPipe) payload: Partial<TransactionEntity>
  ) {
    return this.appService.validate(payload);
  }
}
