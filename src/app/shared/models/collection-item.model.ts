// export class ColItem {
//     readonly id: string;
//     readonly collectionId: string;
//     readonly created: Date;
//     readonly createdBy: {name: string, id: string};
//     modified: Date;
//     title: string;
//     description: string;
//     shape: string;
//     size?: string;
//     themes?: string[];
//     photoFile?: string;
//     photo?: string;
//     photoPreview?: string;
//     contributors: Array<{name: string, id: string}>;
//     [key: string]: any;
//     constructor(props: {
//         readonly id: string,
//         readonly collectionId: string,
//         readonly created: Date,
//         readonly createdBy: {name: string, id: string},
//         modified: Date,
//         title: string,
//         description: string,
//         shape: string,
//         size?: string,
//         themes?: string[],
//         photoFile?: string,
//         photo?: string,
//         photoPreview?: string,
//         contributors: Array<{name: string, id: string}>,

//     }) {
//         this.id = props.id || '';
//         this.collectionId = props.collectionId || '';
//         this.created = props.created || new Date(),
//         this.createdBy = props.createdBy || null,
//         this.modified = props.modified || new Date(),
//         this.title = props.title || '';
//         this.description = props.description || '';
//         this.shape = props.shape || '';
//         this.size = props.size || '';
//         this.themes = props.themes || [];
//         this.photoFile =  props.photoFile || '';
//         this.photo = props.photo || '';
//         this.photoPreview = props.photoPreview || '';
//         this.contributors = props.contributors || [];
//     }
// }

// export class StickerItem extends ColItem {
//     colored: boolean;
//     constructor(props) {
//         super(props);
//         this.colored = !!props.colored;
//     }
// }

// export class CoinItem extends ColItem {
//     issuedOn: Date;
//     issuedTo?: Date;
//     stillIssued: boolean;
//     distribution?: string;
//     composition?: string;
//     orientation?: string;
//     rim?: string;
//     edge?: string;
//     weight?: number; // float
//     diameter?: number; // float
//     faceValue?: string;
//     mints?: string[];
//     mintage?: number;
//     constructor(props) {
//         super(props);
//         this.issuedOn = props.issuedOn || new Date();
//         this.issuedTo = props.issuedTo || new Date();
//         this.stillIssued = !!props.stillIssued;
//         this.distribution = props.distribution || '';
//         this.composition = props.composition || '';
//         this.orientation = props.orientation || '';
//         this.rim = props.rim || '';
//         this.edge = props.edge || '';
//         this.weight = props.weight || 0.0;
//         this.diameter = props.diameter || 0.0;
//         this.faceValue = props.faceValue || '';
//         this.mints = props.mints || [],
//         this.mintage = props.mintage || 0;
//     }
// }

// export class StampItem extends ColItem {
//     issuedOn: Date;
//     colored: boolean;
//     format: string;
//     emission: string;
//     printing: string;
//     faceValue: string;
//     printRun: number;

//     constructor(props) {
//         super(props);
//         this.issuedOn = props.issuedOn || new Date();
//         this.colored = !!props.colored;
//         this.format = props.format || '';
//         this.emission = props.emission || '';
//         this.printing = props.printing || '';
//         this.printRun = props.printRun || 0;
//         this.faceValue = props.faceValue || '';
//     }
// }
