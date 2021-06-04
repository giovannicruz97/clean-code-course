import ClassRepository from "./ClassRepository";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";
import EnrollmentRepository from "./EnrollmentRepository";
import Student from "./Student";
import Enrollment from "./Enrollment";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default class EnrollStudent {
  constructor(
    private levelRepository: LevelRepository,
    private moduleRepository: ModuleRepository,
    private classRepository: ClassRepository,
    private enrollmentRepository: EnrollmentRepository,
  ) { }

  private dateDifferenceInDays(firstDate: Date, secondDate: Date): number {
    const firstDateInUtc = Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    const secondDateInUtc = Date.UTC(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate());

    return Math.floor((secondDateInUtc - firstDateInUtc) / MS_PER_DAY);
  }

  execute(enrollmentRequest: any) {
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate,
    );

    const level = this.levelRepository.findByCode(enrollmentRequest.level);
    const module = this.moduleRepository.findByCode(enrollmentRequest.level, enrollmentRequest.module);
    const clazz = this.classRepository.findByCode(
      enrollmentRequest.module,
      enrollmentRequest.level,
      enrollmentRequest.class
    );

    const currentYear = new Date().getFullYear();
    if (student.getAge() < module.minimumAge) throw new Error("Student below minimum age");

    const studentsEnrolledInClass = this.enrollmentRepository.findAllByClass(
      level.code,
      module.code,
      clazz.code
    );
    if (studentsEnrolledInClass.length === clazz.capacity) throw new Error("Class is over capacity")

    const existingEnrollment = this.enrollmentRepository.findByCpf(enrollmentRequest.student.cpf);
    if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");

    const today = new Date();
    const startDate = new Date(clazz.start_date);
    const endDate = new Date(clazz.end_date);
    if (today > endDate) throw new Error("Class is already finished");

    const fullPeriod = this.dateDifferenceInDays(startDate, endDate);
    const currentPeriod = this.dateDifferenceInDays(startDate, today);
    const totalProgressPercentage = (currentPeriod / fullPeriod) * 100;
    const startLimitPercentage = 25;
    if (totalProgressPercentage > startLimitPercentage) throw new Error("Class is already started");

    const installmentsValue = module.price / enrollmentRequest.installments;
    const isInstallmentValueDecimal = !Number.isInteger(installmentsValue);
    const roundedInstallmentsValue = Math.floor(installmentsValue);

    let differenceBetweenInstallments = 0;
    if (isInstallmentValueDecimal) differenceBetweenInstallments = installmentsValue - roundedInstallmentsValue;

    let toBeAdded = 0;
    let invoices = [];
    for (let i = 1; i <= enrollmentRequest.installments; i++) {
      if (isInstallmentValueDecimal) toBeAdded += differenceBetweenInstallments
      const invoice = {
        installment: i,
        value: roundedInstallmentsValue
      };

      if (i === enrollmentRequest.installments) invoice.value = Math.floor(roundedInstallmentsValue + toBeAdded);
      invoices.push(invoice);
    }

    const sequence = `${this.enrollmentRepository.count() + 1}`.padStart(4, "0");
    const code = `${currentYear}${level.code}${module.code}${clazz.code}${sequence}`;
    const enrollment = new Enrollment(student, level.code, module.code, clazz.code, code, invoices);
    this.enrollmentRepository.save(enrollment);

    return enrollment;
  }
}
