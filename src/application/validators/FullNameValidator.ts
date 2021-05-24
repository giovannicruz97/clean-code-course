import Validator from "./Validator";

class FullNameValidator implements Validator {
  private fullNameRegex: RegExp;

  constructor() {
    this.fullNameRegex = /^([A-Za-z]+ )+([A-Za-z])+$/;
  }

  public validate(name: string) {
    return this.fullNameRegex.test(name);
  }
}

export default FullNameValidator;
