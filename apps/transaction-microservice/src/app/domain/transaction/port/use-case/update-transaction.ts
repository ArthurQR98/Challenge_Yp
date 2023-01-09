import { TransactionEntity } from '@challenge/shared/entity';

export interface UpdateTransactionPort {
  data: Partial<TransactionEntity>;
  statusId: number;
}
