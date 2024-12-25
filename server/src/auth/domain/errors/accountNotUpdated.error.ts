export class AccountNotUpdatedError extends Error {
  constructor() {
    super('The account not updated.');
  }
}