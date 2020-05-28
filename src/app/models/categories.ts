export class Categories {
    data: Data[] = [];
    count: number;
}

class Data {
    _id: string;
    description: string;
    slugType: string;
    active: boolean;
}