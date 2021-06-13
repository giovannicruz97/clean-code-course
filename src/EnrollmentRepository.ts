import Enrollment from "./Enrollment";

export default interface EnrollmentRepository {
  save(enrollment: Enrollment): void;
  findAllByClassroom(level: string, module: string, classroom: string): Enrollment[];
  findByCode(code: string): Enrollment | undefined;
  findByCpf(cpf: string): Enrollment | undefined;
  count(): number;
}
