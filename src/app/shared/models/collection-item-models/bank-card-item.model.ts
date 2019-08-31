import { ColItem } from './col-item.model';

export class BankCardItem extends ColItem {
  provider: string;
  issuedOn: Date;
  issuer: string;
  type: string;

  constructor(props) {
    super(props);
    this.provider = props.provider || '';
    this.issuedOn = props.issuedOn || new Date();
    this.issuer = props.issuer || '';
    this.type = props.type || '';
  }
}
