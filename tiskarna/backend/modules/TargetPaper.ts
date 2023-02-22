import { Paper } from './Paper';

type Axis = 'x' | 'y';

export class TargetPaper extends Paper {
  protected ratio: number = 0;
  protected xPadding: number = 0;
  protected yPadding: number = 0;

  public createFit(originalPaper: Paper) {
    this.ratio = this.width / originalPaper.width;

    if (originalPaper.getRatio() > this.getRatio()) {
      this.xPadding = 0;
      this.yPadding = (this.height - originalPaper.height * this.ratio) / 2;
    } else {
      this.ratio = this.height / originalPaper.height;

      this.xPadding = (this.width - originalPaper.width * this.ratio) / 2;
      this.yPadding = 0;
    }
  }

  // Returns as percentage of this paper
  public fit(axis: Axis, value: number) {
    if (axis === 'x') return (value * this.ratio + this.xPadding) / this.width;
    if (axis === 'y') return (value * this.ratio + this.yPadding) / this.height;
  }
}
