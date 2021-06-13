import EnrollmentCode from "./EnrollmentCode";
import EnrollmentRepository from "./EnrollmentRepository";

export default class GetEnrollment {
  enrollmentRepository: EnrollmentRepository;

  constructor(enrollmentRepository: EnrollmentRepository) {
    this.enrollmentRepository = enrollmentRepository;
  }

  execute(code: EnrollmentCode) {
    return this.enrollmentRepository.findByCode(code.value);
  }
}
