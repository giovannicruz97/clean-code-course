import BaseValidator from "./BaseValidator";

const FACTOR_DIGIT_1 = 10;
const FACTOR_DIGIT_2 = 11;
const MAX_DIGITS_1 = 9;
const MAX_DIGITS_2 = 10;

class CpfValidator implements BaseValidator {
  protected toDigitArray(cpf: string) {
    return [...cpf].map(digit => parseInt(digit));
  }

  private extractDigits(cpf: string) {
    return cpf.replace(/\D/g, "");
  }

  private isInvalidLength(cpf: string) {
    return cpf.length !== 11;
  }

  private isBlocked(cpf: string) {
    const [digit1] = cpf;
    return cpf.split("").every(digit => digit === digit1);
  }

  private calculateDigit(cpf: string, factor: number, max: number) {
    let total = 0;
    for (const digit of this.toDigitArray(cpf).slice(0, max)) {
      total += digit * factor--;
    }
    return (total % 11 < 2) ? 0 : (11 - total % 11);
  }

  private getCheckDigit(cpf: string) {
    return cpf.slice(9);
  }

  public validate(inputCpf: string = "") {
    const cpf = this.extractDigits(inputCpf);
    if (this.isInvalidLength(cpf)) return false;
    if (this.isBlocked(cpf)) return false;

    const digit1 = this.calculateDigit(cpf, FACTOR_DIGIT_1, MAX_DIGITS_1);
    const digit2 = this.calculateDigit(cpf, FACTOR_DIGIT_2, MAX_DIGITS_2);
    const calculatedCheckDigit = `${digit1}${digit2}`;

    return this.getCheckDigit(cpf) === calculatedCheckDigit;
  }
}

export default CpfValidator;
