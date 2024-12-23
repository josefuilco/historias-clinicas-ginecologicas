export class AccountNotFoundError extends Error {
  constructor() {
    super('The account not found.');
  }
}