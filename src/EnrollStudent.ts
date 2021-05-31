import Enrollment from "./Enrollment";
import Student from "./Student";

export default class EnrollStudent {
  enrollments: Map<string, any>;
  levelToMinimunAgeDictionary: any;

  constructor() {
    this.enrollments = new Map();
    this.levelToMinimunAgeDictionary = {
      EM: 16
    }
  }

  execute(enrollmentRequest: any) {
    const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf);
    const existingEnrollment = this.enrollments.has(student.cpf.value);
    if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");
    const currentYear = new Date().getFullYear();
    const studentAge = currentYear - new Date(enrollmentRequest.student.birthDate).getFullYear();
    const isBirthDateInvalid = studentAge <= this.levelToMinimunAgeDictionary[enrollmentRequest.level];
    if (isBirthDateInvalid) throw new Error("Student below minimum age")
    const enrollment = new Enrollment(
      enrollmentRequest.level,
      enrollmentRequest.module,
      enrollmentRequest.class
    );
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
