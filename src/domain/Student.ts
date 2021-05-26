import CpfValidator from "../application/validators/CpfValidator";
import FullNameValidator from "../application/validators/FullNameValidator";
import Validator from "../application/validators/Validator";

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
