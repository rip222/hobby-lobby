import { ColItem } from './col-item.model';

export class BottleCapItem extends ColItem {
  company: string;
  location: string;
  issuedOn: string;
  brand: string;
  beverageType: string;
  capType: string;

  constructor(props) {
    super(props);
    this.company = props.company || '';
    this.location = props.location || '';
    this.issuedOn = props.issuedOn || '';
    this.brand = props.brand || '';
    this.beverageType = props.beverageType || '';
    this.capType = props.capType || '';
  }
}
