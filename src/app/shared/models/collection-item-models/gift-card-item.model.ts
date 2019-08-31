import { ColItem } from './col-item.model';

export class GiftCardItem extends ColItem {
  company: string;
  issuedOn: string;
  faceValue: string;

  constructor(props) {
    super(props);
    this.company = props.company || '';
    this.issuedOn = props.issuedOn || '';
    this.faceValue = props.faceValue || '';
  }
}
