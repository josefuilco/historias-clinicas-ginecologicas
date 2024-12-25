export class AccountNotCreatedError extends Error {
  constructor() {
    super('The account not created')
  }
}