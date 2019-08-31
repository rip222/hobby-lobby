import { ColItem } from './col-item.model';

export class PhoneCardItem extends ColItem {
  composition?: string;
  system?: string;
  validity?: string;
  chipType?: string;
  manufacturer?: string;
  faceValue?: string;

  constructor(props) {
    super(props);
    this.composition = props.composition || '';
    this.system = props.system || '';
    this.validity = props.validity || '';
    this.chipType = props.chipType || '';
    this.manufacturer = props.manufacturer || '';
    this.faceValue = props.faceValue || '';
  }
}
