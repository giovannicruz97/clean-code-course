import ClassroomRepositoryMemory from "./ClassroomRepositoryMemory";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import EnrollStudent from "./EnrollStudent";
import CancelEnrollment from "./CancelEnrollment";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";

let enrollStudent: EnrollStudent;
let cancelEnrollment: CancelEnrollment;

beforeEach(function () {
  const enrollmentRepository = new EnrollmentRepositoryMemory();
  const levelRepository = new LevelRepositoryMemory();
  const moduleRepository = new ModuleRepositoryMemory();
  const classroomRepository = new ClassroomRepositoryMemory();
  enrollStudent = new EnrollStudent(levelRepository, moduleRepository, classroomRepository, enrollmentRepository);
  cancelEnrollment = new CancelEnrollment(enrollmentRepository);
});

test("Should cancel enrollment", function () {
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "627.967.840-70"
    },
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12
  };
  const enrollment = enrollStudent.execute(enrollmentRequest);
  const cancelEnrollmentRequest = {
    code: enrollment.code.value,
  };
  const cancelledEnrollment = cancelEnrollment.execute(cancelEnrollmentRequest);
  if (cancelledEnrollment) {
    expect(cancelledEnrollment.status.value).toBe("cancelled");
  }
});
