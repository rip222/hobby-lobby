import { ColItem } from './col-item.model';

export class AdmissionTicketItem extends ColItem {
  location?: string;
  issuedOn?: Date;
  ticketStyle?: string;
  venueType?: string;

  constructor(props) {
    super(props);

    this.location = props.location || '';
    this.issuedOn = props.issuedOn || new Date();
    this.ticketStyle = props.ticketStyle || '';
    this.venueType = props.venueType || '';
  }
}
