import ClassroomRepositoryMemory from "./ClassroomRepositoryMemory";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import EnrollStudent from "./EnrollStudent";
import GetEnrollment from "./GetEnrollment";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;

beforeEach(function () {
  const enrollmentRepository = new EnrollmentRepositoryMemory();
  const levelRepository = new LevelRepositoryMemory();
  const moduleRepository = new ModuleRepositoryMemory();
  const classroomRepository = new ClassroomRepositoryMemory();
  enrollStudent = new EnrollStudent(levelRepository, moduleRepository, classroomRepository, enrollmentRepository);
  getEnrollment = new GetEnrollment(enrollmentRepository);
});

test("Should get enrollment by code with invoice balance", function () {
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "537.817.770-73"
    },
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12
  };
  const enrollment = enrollStudent.execute(enrollmentRequest);
  expect(enrollment.invoices).toHaveLength(12);
  expect(enrollment.invoices[0].amount).toBe(1416.66);
  expect(enrollment.invoices[11].amount).toBe(1416.73);
  const foundEnrollment = getEnrollment.execute(enrollment.code);
  if (foundEnrollment) {
    expect(foundEnrollment.student.name).toBe(enrollment.student.name);
    expect(foundEnrollment.student.cpf).toBe(enrollment.student.cpf);
    expect(foundEnrollment.code).toBe(enrollment.code);
  }
});
