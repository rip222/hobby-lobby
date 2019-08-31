import { ColItem } from './col-item.model';

export class DrinkLabelItem extends ColItem {
  company: string;
  location: string;
  frontLabelSize: string;
  brand: string;
  beverageType: string;
  volume: string;

  constructor(props) {
    super(props);
    this.company = props.company || '';
    this.location = props.location || '';
    this.frontLabelSize = props.frontLabelSize || '';
    this.brand = props.brand || '';
    this.beverageType = props.beverageType || '';
    this.volume = props.volume || '';
  }
}
