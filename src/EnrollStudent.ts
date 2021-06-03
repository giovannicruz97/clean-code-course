import ClassRepository from "./ClassRepository";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";
import EnrollmentRepository from "./EnrollmentRepository";
import Student from "./Student";
import Enrollment from "./Enrollment";

export default class EnrollStudent {
  constructor(
    private levelRepository: LevelRepository,
    private moduleRepository: ModuleRepository,
    private classRepository: ClassRepository,
    private enrollmentRepository: EnrollmentRepository,
  ) { }

  execute(enrollmentRequest: any) {
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate,
    );

    const level = this.levelRepository.findByCode(enrollmentRequest.level);
    const module = this.moduleRepository.findByCode(enrollmentRequest.level, enrollmentRequest.module);
    const clazz = this.classRepository.findByCode(
      enrollmentRequest.module,
      enrollmentRequest.level,
      enrollmentRequest.class
    );

    const currentYear = new Date().getFullYear();
    if (student.getAge() < module.minimumAge) throw new Error("Student below minimum age");

    const studentsEnrolledInClass = this.enrollmentRepository.findAllByClass(
      level.code,
      module.code,
      clazz.code
    );

    const existingEnrollment = this.enrollmentRepository.findByCpf(enrollmentRequest.student.cpf);
    if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");
    if (studentsEnrolledInClass.length === clazz.capacity) throw new Error("Class is over capacity")

    const sequence = `${this.enrollmentRepository.count() + 1}`.padStart(4, "0");
    const code = `${currentYear}${level.code}${module.code}${clazz.code}${sequence}`;
    const enrollment = new Enrollment(student, level.code, module.code, clazz.code, code);
    this.enrollmentRepository.save(enrollment);

    return enrollment;
  }
}
