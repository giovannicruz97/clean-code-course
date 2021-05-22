import CpfValidator from './CpfValidator';

type EnrollmentRequest = {
    student: {
        name: string;
        cpf: string;
    }
};


class EnrollStudent {
    private students;

    constructor(private cpfValidator: CpfValidator) {
        this.students = new Map();
    }

    public execute(enrollmentRequest: EnrollmentRequest): boolean {
        const fullNameRegex = /^([A-Za-z]+ )+([A-Za-z])+$/;
        const { student: { name } } = enrollmentRequest;
        if (!fullNameRegex.test(name)) {
            throw new Error("Invalid student name");
        }

        if (!this.cpfValidator.validateCpf(enrollmentRequest.student.cpf)) {
            throw new Error("Invalid student cpf");
        }

        const { student: { cpf } } = enrollmentRequest;

        if (this.students.has(cpf)) {
            throw new Error("Enrollment with duplicated student is not allowed");
        }

        this.students.set(cpf, enrollmentRequest.student)
        return true;
    }
}

export default EnrollStudent;