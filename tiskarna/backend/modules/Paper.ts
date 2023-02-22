export class Paper {
  constructor(public width: number, public height: number) {}

  public getRatio() {
    return this.width / this.height;
  }
}
