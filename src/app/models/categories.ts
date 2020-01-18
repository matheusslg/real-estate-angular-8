export class Categories {
    data: Data[] = [];
    count: number;
}

class Data {
    _id: string;
    description: string;
    active: boolean;
}