import { ColItem } from './col-item.model';

export class CoinItem extends ColItem {
  issuedOn: Date;
  issuedTo?: Date;
  stillIssued: boolean;
  distribution?: string;
  composition?: string;
  orientation?: string;
  rim?: string;
  edge?: string;
  weight?: number; // float
  diameter?: number; // float
  faceValue?: string;
  mints?: string[];
  mintage?: number;
  constructor(props) {
      super(props);
      this.issuedOn = props.issuedOn || new Date();
      this.issuedTo = props.issuedTo || new Date();
      this.stillIssued = !!props.stillIssued;
      this.distribution = props.distribution || '';
      this.composition = props.composition || '';
      this.orientation = props.orientation || '';
      this.rim = props.rim || '';
      this.edge = props.edge || '';
      this.weight = props.weight || 0.0;
      this.diameter = props.diameter || 0.0;
      this.faceValue = props.faceValue || '';
      this.mints = props.mints || [],
      this.mintage = props.mintage || 0;
  }
}
