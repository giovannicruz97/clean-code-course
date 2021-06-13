const AVAILABLE_STATUSES = ['enrolled', 'cancelled'];

export default class Status {
  value: string;

  constructor(value: string) {
    if (!AVAILABLE_STATUSES.includes(value)) throw new Error('Status not found');
    this.value = value;
  }
}
