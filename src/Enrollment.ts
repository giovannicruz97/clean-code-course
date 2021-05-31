export default class Enrollment {
  level: string;
  module: string;
  enrollmentClass: string;

  constructor(level: string, module: string, enrollmentClass: string) {
    this.level = level;
    this.module = module;
    this.enrollmentClass = enrollmentClass;
  }
}
