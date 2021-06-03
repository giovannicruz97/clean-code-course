export default interface ClassRepository {
  findByCode(module: string, level: string, code: string): any;
}
