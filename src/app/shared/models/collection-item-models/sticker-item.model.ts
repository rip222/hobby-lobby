import { ColItem } from './col-item.model';

export class StickerItem extends ColItem {
  colored: boolean;

  constructor(props) {
    super(props);
    this.colored = !!props.colored;
  }
}
