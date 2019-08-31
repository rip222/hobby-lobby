import { ColItem } from './col-item.model';

export class SportsCardItem extends ColItem {
  sportType?: string;
  language?: string;
  number?: number;
  player?: string;
  team?: string;
  league?: string;
  season?: string;
  brand?: string;
  setType?: string;

  constructor(props) {
    super(props);

    this.sportType = props.sportType || '';
    this.language = props.language || '';
    this.number = props.number || 0.0;
    this.player = props.player || '';
    this.team = props.team || '';
    this.league = props.league || '';
    this.season = props.season || '';
    this.brand = props.brand || '';
    this.setType = props.setType || '';
  }
}
