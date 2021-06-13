import ClassroomRepositoryMemory from "./ClassroomRepositoryMemory";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import EnrollStudent from "./EnrollStudent";
import PayInvoice from "./PayInvoice";
import GetEnrollment from "./GetEnrollment";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";

let enrollStudent: EnrollStudent;
let payInvoice: PayInvoice;
let getEnrollment: GetEnrollment;

beforeEach(function () {
  const enrollmentRepository = new EnrollmentRepositoryMemory();
  const levelRepository = new LevelRepositoryMemory();
  const moduleRepository = new ModuleRepositoryMemory();
  const classroomRepository = new ClassroomRepositoryMemory();
  enrollStudent = new EnrollStudent(levelRepository, moduleRepository, classroomRepository, enrollmentRepository);
  payInvoice = new PayInvoice(enrollmentRepository);
  getEnrollment = new GetEnrollment(enrollmentRepository);
});

test("Should pay enrollment invoice", function () {
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "526.069.490-21"
    },
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12
  };
  const enrollment = enrollStudent.execute(enrollmentRequest);
  const paymentRequest = {
    code: "2021EM1A0001",
    month: 1,
    year: 2021,
    amount: 1416.66
  };
  payInvoice.execute(paymentRequest);
  const foundEnrollment = getEnrollment.execute(enrollment.code);
  if (foundEnrollment) {
    expect(foundEnrollment.installments).toBe(11);
    expect(foundEnrollment.invoices).toHaveLength(12);
    expect(foundEnrollment.invoices[0].amount).toBe(0);
    expect(foundEnrollment.invoices[11].amount).toBe(1416.73);
  }
});
