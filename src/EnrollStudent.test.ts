import ClassRepositoryMemory from "./ClassRepositoryMemory";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import EnrollStudent from "./EnrollStudent";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";

let enrollStudent: EnrollStudent;

beforeEach(function () {
  const enrollmentRepository = new EnrollmentRepositoryMemory();
  const levelRepository = new LevelRepositoryMemory();
  const moduleRepository = new ModuleRepositoryMemory();
  const classRepository = new ClassRepositoryMemory();
  enrollStudent = new EnrollStudent(
    levelRepository,
    moduleRepository,
    classRepository,
    enrollmentRepository
  );
});

test("Should not enroll without valid student name", function () {
  const enrollmentRequest = {
    student: {
      name: "Ana"
    },
    level: "EM",
    module: "1",
    class: "A"
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid name"));
});

test("Should not enroll without valid student cpf", function () {
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "213.345.654-10"
    },
    level: "EM",
    module: "1",
    class: "A"
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid cpf"));
});

test("Should not enroll duplicated student", function () {
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "864.464.227-84"
    },
    level: "EM",
    module: "1",
    class: "A"
  };
  enrollStudent.execute(enrollmentRequest);
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"));
});

test("Should generate enrollment code", function () {
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "864.464.227-84"
    },
    level: "EM",
    module: "1",
    class: "A"
  };
  const enrollment = enrollStudent.execute(enrollmentRequest);
  expect(enrollment.code).toBe("2021EM1A0001");
});

test("Should not enroll student below minimum age", function () {
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "864.464.227-84",
      birthDate: "2014-03-12"
    },
    level: "EM",
    module: "1",
    class: "A"
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Student below minimum age"));
});

test("Should not enroll student over class capacity", function () {
  enrollStudent.execute({
    student: {
      name: "Ana Maria",
      cpf: "864.464.227-84"
    },
    level: "EM",
    module: "1",
    class: "A"
  });

  enrollStudent.execute({
    student: {
      name: "Giovanni Cruz",
      cpf: "367.181.600-75"
    },
    level: "EM",
    module: "1",
    class: "A"
  });

  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "670.723.738-10"
    },
    level: "EM",
    module: "1",
    class: "A"
  };

  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Class is over capacity"));
});

test("Should not enroll after the end of the class", function () {
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "864.464.227-84",
      birthDate: "2005-03-12"
    },
    level: "EM",
    module: "1",
    class: "A"
  };

  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Class is already finished"));
});

test("Should not enroll after 25% of the start of the class", function () {
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "864.464.227-84",
      birthDate: "2001-03-12"
    },
    level: "EM",
    module: "3",
    class: "A"
  };

  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Class is already started"));
});

test.only("Should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice", function () {
  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Fonseca",
      cpf: "755.525.774-26",
      birthDate: "2002-03-12"
    },
    level: "EM",
    module: "3",
    class: "C",
    installments: 12
  };

  const { invoices } = enrollStudent.execute(enrollmentRequest);
  expect(invoices).toEqual([
    {
      installment: 1,
      value: 1416
    },
    {
      installment: 2,
      value: 1416
    },
    {
      installment: 3,
      value: 1416
    },
    {
      installment: 4,
      value: 1416
    },
    {
      installment: 5,
      value: 1416
    },
    {
      installment: 6,
      value: 1416
    },
    {
      installment: 7,
      value: 1416
    },
    {
      installment: 8,
      value: 1416
    },
    {
      installment: 9,
      value: 1416
    },
    {
      installment: 10,
      value: 1416
    },
    {
      installment: 11,
      value: 1416
    },
    {
      installment: 12,
      value: 1424
    }
  ]);
});
