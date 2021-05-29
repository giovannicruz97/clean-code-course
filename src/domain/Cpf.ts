import CpfValidator from './validators/CpfValidator';

class Cpf {
  public value: string;
  private cpfValidator: CpfValidator;

  constructor(value: string) {
    this.cpfValidator = new CpfValidator();
    if (!this.cpfValidator.validate(value)) throw new Error("Invalid cpf");
    this.value = value;
  }
}

export default Cpf;
