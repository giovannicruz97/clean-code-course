import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";

export default class EnrollmentRepositoryMemory implements EnrollmentRepository {
  enrollments: Enrollment[];

  constructor() {
    this.enrollments = [];
  }

  save(enrollment: Enrollment): void {
    if (this.findByCode(enrollment.code.value)) this.enrollments = this.enrollments.filter(memoryEnrollment => memoryEnrollment.code.value !== enrollment.code.value);
    this.enrollments.push(enrollment);
  }
  findByCode(code: string) {
    return this.enrollments.find(enrollment => enrollment.code.value === code);
  }
  findAllByClassroom(level: string, module: string, classroom: string) {
    return this.enrollments.filter(enrollment => enrollment.level.code === level && enrollment.module.code === module && enrollment.classroom.code === classroom && enrollment.status.value === "enrolled");
  }
  findByCpf(cpf: string) {
    return this.enrollments.find(enrollment => enrollment.student.cpf.value === cpf);
  }
  count(): number {
    return this.enrollments.length;
  }
}
