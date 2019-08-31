import { ColItem } from './col-item.model';

export class BeerCoasterItem extends ColItem {
  company: string;
  location: string;
  issuedOn: string;
  composition: string;
  industry: string;
  brand: string;

  constructor(props) {
    super(props);
    this.company = props.company || '';
    this.location = props.location || '';
    this.issuedOn = props.location || '';
    this.composition = props.location || '';
    this.industry = props.industry || '';
    this.brand = props.brand || '';
  }
}
