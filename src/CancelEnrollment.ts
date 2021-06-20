import EnrollmentRepository from "./EnrollmentRepository";
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";
import Status from "./Status";

export default class CancelEnrollment {
  enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbstractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(cancelRequest: any) {
    const enrollment = this.enrollmentRepository.get(cancelRequest.code);
    if (enrollment) {
      enrollment.status = new Status('cancelled');
      this.enrollmentRepository.save(enrollment);
    }

    return enrollment;
  }
}
