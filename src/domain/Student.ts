import CpfValidator from "./validators/CpfValidator";
import FullNameValidator from "./validators/FullNameValidator";
import Validator from "./validators/Validator";

class Student {
  constructor(
    public name: string,
    public cpf: string,
    private fullNameValidator: Validator = new FullNameValidator(),
    private cpfValidator: Validator = new CpfValidator()
  ) {
    if (!this.fullNameValidator.validate(name)) throw new Error("Invalid student name");
    if (!this.cpfValidator.validate(cpf)) throw new Error("Invalid student cpf");
    this.name = name;
    this.cpf = cpf;
  }
}

export default Student;
