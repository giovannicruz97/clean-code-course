import EnrollmentRepository from "./EnrollmentRepository";

export default class PayInvoice {
  enrollmentRepository: EnrollmentRepository;

  constructor(enrollmentRepository: EnrollmentRepository) {
    this.enrollmentRepository = enrollmentRepository;
  }

  execute(paymentRequest: any) {
    const enrollment = this.enrollmentRepository.findByCode(paymentRequest.code);
    if (!enrollment) throw new Error("Enrollment not found");
    const selectedInvoice = paymentRequest.month - 1;
    const invoice = enrollment.invoices[selectedInvoice];
    if (!invoice) throw new Error("Invoice not found");
    if (invoice.amount !== paymentRequest.amount) throw new Error("Amount not equal to invoice value");
    invoice.amount -= paymentRequest.amount;
    enrollment.invoices[selectedInvoice] = invoice;
    if(invoice.amount === 0) enrollment.installments -= 1;
    this.enrollmentRepository.save(enrollment);
  }
}
