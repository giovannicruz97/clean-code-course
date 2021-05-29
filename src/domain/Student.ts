import Cpf from "./Cpf";
import Name from "./Name";
class Student {
  public name: Name;
  public cpf: Cpf;

  constructor(
    name: string,
    cpf: string,
  ) {
    this.name = new Name(name);
    this.cpf = new Cpf(cpf);
  }
}

export default Student;
