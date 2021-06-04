import ClassRepository from "./ClassRepository";

export default class ClassRepositoryMemory implements ClassRepository {
  classes: any[];

  constructor() {
    this.classes = [
      {
        level: "EM",
        module: "1",
        code: "A",
        capacity: 2,
        start_date: "2021-05-01",
        end_date: "2021-06-01"
      },
      {
        level: "EM",
        module: "3",
        code: "A",
        capacity: 5,
        start_date: "2021-01-01",
        end_date: "2021-12-15"
      },
      {
        level: "EM",
        module: "3",
        code: "B",
        capacity: 5,
        start_date: "2021-05-01",
        end_date: "2021-05-30"
      },
      {
        level: "EM",
        module: "3",
        code: "C",
        capacity: 5,
        start_date: "2021-06-01",
        end_date: "2021-06-30"
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
