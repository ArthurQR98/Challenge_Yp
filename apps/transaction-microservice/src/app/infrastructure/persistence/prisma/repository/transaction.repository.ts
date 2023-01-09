import { CreateTransactionDto } from '@challenge/shared/dto';
import { Inject } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { TransactionRepositoryPort } from '../../../../domain/transaction/port/persistence/transaction.repository';
import { PrismaService } from '../../../prisma/prisma.service';

export class TransactionRepository implements TransactionRepositoryPort {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService
  ) {}

  storeTransaction(
    payload: CreateTransactionDto
  ): Promise<Partial<Transaction>> {
    return this.prismaService.transaction.create({
      data: {
        accountExternalIdDebit: payload.accountExternalIdDebit,
        accountExternalIdCredit: payload.accountExternalIdCredit,
        value: payload.value,
        transactionType: {
          connect: {
            id: payload.tranferTypeId,
          },
        },
      },
      select: {
        transactionExternalId: true,
        transactionType: {
          select: {
            name: true,
          },
        },
        transactionStatus: {
          select: {
            name: true,
          },
        },
        value: true,
        createdAt: true,
      },
    });
  }

  findTransaction(id: string): Promise<Partial<Transaction>> {
    return this.prismaService.transaction.findUnique({
      where: {
        transactionExternalId: id,
      },
      select: {
        transactionExternalId: true,
        transactionType: {
          select: {
            name: true,
          },
        },
        transactionStatus: {
          select: {
            name: true,
          },
        },
        value: true,
        createdAt: true,
      },
    });
  }

  updateTransaction(
    transactionId: string,
    statusId: number
  ): Promise<Transaction> {
    return this.prismaService.transaction.update({
      where: {
        transactionExternalId: transactionId,
      },
      data: {
        transactionStatus: {
          connect: {
            id: statusId,
          },
        },
      },
    });
  }
}
