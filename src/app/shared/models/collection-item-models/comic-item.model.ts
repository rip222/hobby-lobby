import { ColItem } from './col-item.model';

export class ComicItem extends ColItem {
  publisher?: string;
  colored?: boolean;
  issuedOn?: Date;
  issuingPeriodicity?: string;
  issueType?: string;
  issuingNumber: number;
  edition?: string;
  genre?: string;
  faceValue?: string;
  coverArtist?: string;
  writers?: Array<string>;

  constructor(props) {
    super(props);

    this.publisher = props.publisher || '';
    this.colored = !!props.colored;
    this.issuedOn = props.issuedOn || new Date();
    this.issuingPeriodicity = props.issuingPeriodicity || '';
    this.issueType = props.issueType || '';
    this.issuingNumber = props.issuingNumber || 0;
    this.edition = props.edition || '';
    this.genre = props.genre || '';
    this.faceValue = props.faceValue || '';
    this.coverArtist = props.coverArtist || '';
    this.writers = props.writers || [];
  }

}
