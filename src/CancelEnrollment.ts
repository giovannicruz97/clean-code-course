import EnrollmentRepository from "./EnrollmentRepository";
import Status from "./Status";

export default class CancelEnrollment {
  enrollmentRepository: EnrollmentRepository;

  constructor(enrollmentRepository: EnrollmentRepository) {
    this.enrollmentRepository = enrollmentRepository;
  }

  execute(cancelRequest: any) {
    const enrollment = this.enrollmentRepository.findByCode(cancelRequest.code);
    if (enrollment) {
      enrollment.status = new Status('cancelled');
      this.enrollmentRepository.save(enrollment);
    }

    return enrollment;
  }
}
