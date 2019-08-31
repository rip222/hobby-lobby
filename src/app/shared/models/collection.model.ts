import { UserMin } from './min.model';

export interface Collection {
    readonly id?: string;
    readonly category: string;
    title: string;
    description: string;
    country: string;
    themes: string[];
    created: Date;
    modified: Date;
    createdBy: UserMin;
    totalItems?: number;
    itemsIds: string[];
    producedBy: string;
    producedFrom?: Date;
    producedTo?: Date;
    stillProduced: boolean;
    photoPreview?: string;
    website?: string;
    contributors: Array<UserMin>;
    [key: string]: any;
}

// export class Collection {
//     readonly id?: string;
//     readonly category: string;
//     readonly created: Date;
//     readonly createdBy: UserMin;
//     title: string;
//     description: string;
//     country: string;
//     themes: string[];
//     modified: Date;
//     totalItems?: number;
//     itemsIds: string[];
//     producedBy: string;
//     producedFrom?: Date;
//     producedTo?: Date;
//     stillProduced: boolean;
//     photo?: string;
//     website?: string;
//     contributors: Array<UserMin>;
//     [key: string]: any;

//     constructor(options: {
//         readonly id: string;
//         readonly category: string;
//         readonly created: Date;
//         readonly createdBy: UserMin;
//         title: string;
//         description: string;
//         country: string;
//         themes: string[];
//         modified: Date;
//         totalItems?: number;
//         itemsIds: string[];
//         producedBy: string;
//         producedFrom?: Date;
//         producedTo?: Date;
//         stillProduced: boolean;
//         photo?: string;
//         website?: string;
//         contributors: Array<UserMin>;
//     }) {
//         this.id = options.id || '';
//         this.category = options.category || '';
//         this.created = options.created || new Date();
//         this.createdBy = options.createdBy || null;
//         this.title = options.title || '';
//         this.description = options.description || '';
//         this.country = options.country || '';
//         this.themes = options.themes || [];
//         this.modified = options.modified || new Date();
//         this.totalItems = options.totalItems || null;
//         this.itemsIds = options.itemsIds || [];
//         this.producedBy = options.producedBy || '';
//         this.producedFrom = options.producedFrom || new Date();
//         this.producedTo = options.producedTo || new Date();
//         this.stillProduced = !!options.stillProduced;
//         this.photo = options.photo || '';
//         this.website = options.website || '';
//         this.contributors = options.contributors || [];
//     }
// }
