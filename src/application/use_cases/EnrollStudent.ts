import EnrollmentRequest from '../../domain/EnrollmentRequest';
import Validator from '../validators/Validator';

class EnrollStudent {
  private students: Map<string, EnrollmentRequest>;

  constructor(
    private cpfValidator: Validator,
    private fullNameValidator: Validator
  ) {
    this.students = new Map();
  }

  public execute(enrollmentRequest: EnrollmentRequest): boolean {
    const { student: { name } } = enrollmentRequest;
    if (!this.fullNameValidator.validate(name)) {
      throw new Error("Invalid student name");
    }

    if (!this.cpfValidator.validate(enrollmentRequest.student.cpf)) {
      throw new Error("Invalid student cpf");
    }

    const { student: { cpf } } = enrollmentRequest;
    if (this.students.has(cpf)) {
      throw new Error("Enrollment with duplicated student is not allowed");
    }

    this.students.set(cpf, enrollmentRequest)
    return true;
  }
}

export default EnrollStudent;
