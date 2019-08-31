import { ColItem } from './col-item.model';

export class TransportationTicketItem extends ColItem {
  company?: string;
  issuedOn?: string;
  transportationType?: string;
  ticketSystem?: string;
  faceValue?: string;

  constructor(props) {
    super(props);
    this.company = props.company || '';
    this.issuedOn = props.issuedOn || '';
    this.transportationType = props.transportationType || '';
    this.ticketSystem = props.ticketSystem || '';
    this.faceValue = props.faceValue || '';
  }
}
