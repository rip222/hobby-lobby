import { ColItem } from './col-item.model';

export class PostcardItem extends ColItem {
  location?: string;
  issuedOn?: Date;
  issuer?: string;
  orientation?: string;
  type?: string;
  colored?: boolean;

  constructor(props) {
    super(props);
    this.location = props.location || '';
    this.issuedOn = props.location || new Date();
    this.issuer = props.issuer || '';
    this.orientation = props.orientation || '';
    this.type = props.type || '';
    this.colored = !!props.colored;
  }
}
