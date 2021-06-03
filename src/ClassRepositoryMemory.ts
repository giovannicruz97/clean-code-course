import ClassRepository from "./ClassRepository";

export default class ClassRepositoryMemory implements ClassRepository {
  classes: any[];

  constructor() {
    this.classes = [
      {
        level: "EM",
        module: "1",
        code: "A",
        capacity: 1
      }
    ];
  }

  findByCode(module: string, level: string, code: string) {
    const clazz = this.classes.find(clazz =>
      clazz.module === module &&
      clazz.level === level &&
      clazz.code === code
    );
    if (!clazz) throw new Error("Class not found");

    return clazz;
  }
}
