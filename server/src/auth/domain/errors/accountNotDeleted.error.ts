export class AccountNotDeletedError extends Error {
  constructor() {
    super('The account not deleted.');
  }
}