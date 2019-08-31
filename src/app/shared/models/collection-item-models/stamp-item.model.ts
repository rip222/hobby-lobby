import { ColItem } from './col-item.model';

export class StampItem extends ColItem {
  issuedOn?: Date;
  colored?: boolean;
  format?: string;
  emission?: string;
  printing?: string;
  faceValue?: string;
  printRun?: number;

  constructor(props) {
      super(props);
      this.issuedOn = props.issuedOn || new Date();
      this.colored = !!props.colored;
      this.format = props.format || '';
      this.emission = props.emission || '';
      this.printing = props.printing || '';
      this.printRun = props.printRun || 0;
      this.faceValue = props.faceValue || '';
  }
}
