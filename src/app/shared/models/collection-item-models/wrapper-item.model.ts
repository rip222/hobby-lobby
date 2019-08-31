import { ColItem } from './col-item.model';

export class WrapperItem extends ColItem {
  colored: boolean;
  constructor(props) {
      super(props);
      this.colored = !!props.colored;
  }
}
