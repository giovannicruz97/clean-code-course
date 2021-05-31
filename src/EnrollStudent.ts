import Enrollment from "./Enrollment";
import Student from "./Student";

export default class EnrollStudent {
  enrollments: Map<string, any>;

  constructor() {
    this.enrollments = new Map();
  }

  execute(enrollmentRequest: any) {
    const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf);
    const existingEnrollment = this.enrollments.has(student.cpf.value);
    if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");
    const enrollment = new Enrollment(
      enrollmentRequest.level,
      enrollmentRequest.module,
      enrollmentRequest.class
    );
    const currentYear = new Date().getFullYear();
    let enrollmentsQuantity = this.enrollments.size;
    enrollmentsQuantity += 1;
    const sequence = `${enrollmentsQuantity}`.padStart(4, '0');
    const code = `${currentYear}${enrollment.level}${enrollment.module}${enrollment.enrollmentClass}${sequence}`;
    const enrollmentResponse = {
      student,
      enrollment,
      code,
    };
    this.enrollments.set(student.cpf.value, enrollmentResponse);
    return enrollmentResponse;
  }
}
