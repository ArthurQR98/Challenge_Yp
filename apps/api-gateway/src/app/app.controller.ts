import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';

import { AppService } from './app.service';
import { CreateTransactionDto } from '@challenge/shared/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/transaction')
  async create_transaction(
    @Body(ValidationPipe) data: CreateTransactionDto,
    @Res() res
  ) {
    return this.appService.transaction_created(data, res);
  }

  @Get('/transaction/:transactionExternalId')
  async transaction(@Param('transactionExternalId') id: string, @Res() res) {
    return this.appService.transaction(id, res);
  }
}
