export class TransactionTokens {
  public static readonly Repository: unique symbol = Symbol(
    'TRANSACTION_REPOSITORY'
  );
  public static readonly AntiFraudMicroservice: unique symbol = Symbol(
    'ANTI_FRAUD_MICROSERVICE'
  );
  public static readonly RegisterTransactionUseCase: unique symbol = Symbol(
    'RegisterTransactionUseCase'
  );
  public static readonly FindTransactionUseCase: unique symbol = Symbol(
    'FindTransactionUseCase'
  );
  public static readonly UpdateTransactionUseCase: unique symbol = Symbol(
    'UpdateTransactionUseCase'
  );
}
