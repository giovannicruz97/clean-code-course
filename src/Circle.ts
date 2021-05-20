class Circle {
    constructor(public radius: number) { }

    getArea(): number {
        return 2 * Math.PI * this.radius;
    }
}

export default Circle;