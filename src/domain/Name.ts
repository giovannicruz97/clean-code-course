class Name {
  public value: string;

  constructor(value: string) {
    if (!/^([A-Za-z]+ )+([A-Za-z])+$/.test(value)) throw new Error(("Invalid name"));
    this.value = value;
  }
}

export default Name;
