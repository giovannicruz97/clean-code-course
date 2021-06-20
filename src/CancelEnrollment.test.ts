import EnrollStudent from "./EnrollStudent";
import CancelEnrollment from "./CancelEnrollment";
import RepositoryMemoryFactory from "./RepositoryMemoryFactory";
import EnrollStudentInputData from "./EnrollStudentInputData";

let enrollStudent: EnrollStudent;
let cancelEnrollment: CancelEnrollment;

beforeEach(function () {
  const repositorMemoryFactory = new RepositoryMemoryFactory();
  enrollStudent = new EnrollStudent(repositorMemoryFactory);
  cancelEnrollment = new CancelEnrollment(repositorMemoryFactory);
});

test("Should cancel enrollment", function () {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: "Ana Maria",
    studentCpf: "627.967.840-70",
    studentBirthDate: "2002-10-10",
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12
  });
  const enrollment = enrollStudent.execute(enrollmentRequest);
  const cancelEnrollmentRequest = {
    code: enrollment.code
  };
  const cancelledEnrollment = cancelEnrollment.execute(cancelEnrollmentRequest);
  if (cancelledEnrollment) {
    expect(cancelledEnrollment.status.value).toBe("cancelled");
  }
});
