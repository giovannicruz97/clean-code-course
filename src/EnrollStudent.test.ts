import EnrollStudent from './EnrollStudent';
import CpfValidator from './CpfValidator';

test('Should not enroll without valid student name', () => {
    const cpfValidator = new CpfValidator();
    const enrollStudent = new EnrollStudent(cpfValidator);
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
    const cpfValidator = new CpfValidator();
    const enrollStudent = new EnrollStudent(cpfValidator);
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
    const cpfValidator = new CpfValidator();
    const enrollStudent = new EnrollStudent(cpfValidator);
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