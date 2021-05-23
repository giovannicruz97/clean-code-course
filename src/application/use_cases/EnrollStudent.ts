import CpfValidator from '../validators/CpfValidator';
import EnrollmentRequest from '../../domain/EnrollmentRequest';
import FullNameValidator from '../validators/FullNameValidator';

class EnrollStudent {
  private students: Map<string, EnrollmentRequest>;

  constructor(
    private cpfValidator: CpfValidator,
    private fullNameValidator: FullNameValidator
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
