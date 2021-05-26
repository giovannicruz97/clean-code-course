import EnrollmentRequest from '../../domain/EnrollmentRequest';
import Student from '../../domain/Student';
class EnrollStudent {
  constructor(private students = new Map<string, Student>()) { }

  public execute({ student: { name, cpf } }: EnrollmentRequest): boolean {
    const student = new Student(name, cpf);
    if (this.students.has(student.cpf)) throw new Error("Enrollment with duplicated student is not allowed");
    this.students.set(cpf, student);
    return true;
  }
}

export default EnrollStudent;
