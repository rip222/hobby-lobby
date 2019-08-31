import { ColItem } from './col-item.model';

export class TeaBagItem extends ColItem {
  brand?: string;
  teaType?: string;

  constructor(props) {
    super(props);
    this.brand = props.brand || '';
    this.teaType = props.teaType || '';
  }
}
