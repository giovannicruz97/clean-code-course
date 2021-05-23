import EnrollStudent from './EnrollStudent';
import CpfValidator from '../validators/CpfValidator';
import FullNameValidator from '../validators/FullNameValidator';

const cpfValidator = new CpfValidator();
const fullNameValidator = new FullNameValidator();
const enrollStudent = new EnrollStudent(cpfValidator, fullNameValidator);

test('Should not enroll without valid student name', () => {
  const enrollmentRequest = {
    student: {
      name: "Ana",
      cpf: "455.618.950-01"
    }
  };

  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrowError(new Error("Invalid student name"));
});

test('Should not enroll without valid student cpf', () => {
  const enrollmentRequest = {
    student: {
      name: "Ana Teste",
      cpf: "123.456.789-99"
    }
  };

  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrowError(new Error("Invalid student cpf"));
});

test('Should not enroll duplicated student', () => {
  const enrollmentRequest = {
    student: {
      name: "Ana Teste",
      cpf: "455.618.950-01"
    }
  };

  expect(() => {
    enrollStudent.execute(enrollmentRequest)
    enrollStudent.execute(enrollmentRequest)
  }).toThrowError(new Error("Enrollment with duplicated student is not allowed"));
});
