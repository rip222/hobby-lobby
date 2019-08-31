import { ColItem } from './col-item.model';

export class HotelKeyCardItem extends ColItem {
  hotel?: string;
  chain?: string;
  cardSystem?: string;

  constructor(props) {
    super(props);
    this.hotel = props.hotel || '';
    this.chain = props.chain || '';
    this.cardSystem = props.cardSystem || '';
  }
}
