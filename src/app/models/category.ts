export class Category {
    data: Data = new Data();
    count: number;
}

class Data {
    _id: string;
    description: string;
    slugType: string;
    active: boolean;
}