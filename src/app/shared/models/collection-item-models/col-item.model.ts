import { CollectionMin, UserMin } from '../min.model';

export class ColItem {
  readonly id: string;
  // readonly collectionId: string;
  readonly collection: CollectionMin;
  readonly created: Date;
  readonly createdBy: UserMin;
  modified: Date;
  title: string;
  description: string;
  shape: string;
  size?: string;
  themes?: string[];
  photoFile?: string;
  photo?: string;
  photoPreview?: string;
  contributors: Array<UserMin>;
  [key: string]: any;
  constructor(props: {
      readonly id: string,
      // readonly collectionId: string,
      readonly collection: CollectionMin,
      readonly created: Date,
      readonly createdBy: UserMin,
      modified: Date,
      title: string,
      description: string,
      shape: string,
      size?: string,
      themes?: string[],
      photoFile?: string,
      photo?: string,
      photoPreview?: string,
      contributors: Array<UserMin>,

  }) {
      this.id = props.id || '';
      // this.collectionId = props.collectionId || '';
      this.collection = props.collection || {title: '', id: ''};
      this.created = props.created || new Date(),
      this.createdBy = props.createdBy || null,
      this.modified = props.modified || new Date(),
      this.title = props.title || '';
      this.description = props.description || '';
      this.shape = props.shape || '';
      this.size = props.size || '';
      this.themes = props.themes || [];
      this.photoFile =  props.photoFile || '';
      this.photo = props.photo || '';
      this.photoPreview = props.photoPreview || '';
      this.contributors = props.contributors || [];
  }
}
