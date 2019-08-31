
export interface User {
    id: string;
    email: string;
    name?: string;
    registered: string; // Date.now()
    lastSignIn: string; // Date.now()
    // profileViews: number;
    collections: {
        [key: string]: string[]
    };
    colLikes?: {
        [cid: string]: string[]
    };

    achievements: any;
    experience: number;
}
