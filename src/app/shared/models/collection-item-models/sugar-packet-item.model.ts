import { ColItem } from './col-item.model';

export class SugarPacketItem extends ColItem {
  set?: string;
  issuedOn?: string;
  manufacturer?: string;
  brand?: string;
  content?: string;

  constructor(props) {
    super(props);
    this.set = props.set || '';
    this.issuedOn = props.issuedOn || '';
    this.manufacturer = props.manufacturer || '';
    this.brand = props.brand || '';
    this.content = props.content || '';
  }
}
