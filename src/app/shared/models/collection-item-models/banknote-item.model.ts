import { ColItem } from './col-item.model';

export class BanknoteItem extends ColItem {
  issuedOn?: Date;
  issuedTo?: Date;
  stillIssued?: boolean;
  composition?: string;
  printer?: string;
  faceValue?: string;

  constructor(props) {
    super(props);
    this.issuedOn = props.issuedOn || new Date();
    this.issuedTo = props.issuedTo || new Date();
    this.composition = props.composition || '';
    this.printer = props.printer || '';
    this.faceValue = props.faceValue || '';
  }
}
