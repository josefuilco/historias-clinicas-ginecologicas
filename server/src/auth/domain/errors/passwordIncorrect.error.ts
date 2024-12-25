export class PasswordIncorrectError extends Error {
  constructor() {
    super('The account data is incorrect');
  }
}