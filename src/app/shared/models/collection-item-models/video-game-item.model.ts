import { ColItem } from './col-item.model';

export class VideoGameItem extends ColItem {
  publisher?: string;
  developer?: string;
  genre?: string;
  platforms?: Array<string>;
  media?: string;
  multiplayer?: boolean;
  online?: boolean;
  issuedOn?: Date;
  contentRating?: string[];
  releaseCountry?: string;
  language?: string;
  region?: string;
  license?: string;

  constructor(props) {
    super(props);
    this.publisher = props.publisher || '';
    this.developer = props.developer || '';
    this.genre = props.genre || '';
    this.platforms = props.genre || [];
    this.media = props.media || '';
    this.multiplayer = !!props.multiplayer;
    this.online = !!props.online;
    this.issuedOn = props.issuedOn || new Date();
    this.contentRating = props.contentRating || '';
    this.releaseCountry = props.releaseCountry || '';
    this.language = props.language || '';
    this.region = props.region || '';
    this.license = props.license || '';
  }
}
