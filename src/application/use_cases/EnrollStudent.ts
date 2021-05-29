import EnrollmentRequest from '../../domain/EnrollmentRequest';
import Student from '../../domain/Student';
class EnrollStudent {
  constructor(private enrollments = new Map<string, Student>()) { }

  public execute({ student: { name, cpf } }: EnrollmentRequest): boolean {
    const student = new Student(name, cpf);
    if (this.enrollments.has(student.cpf.value)) throw new Error("Enrollment with duplicated student is not allowed");
    this.enrollments.set(student.cpf.value, student);
    return true;
  }
}

export default EnrollStudent;
