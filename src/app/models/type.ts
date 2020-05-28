export class Type {
    data: Data = new Data();
    count: number;
}

class Data {
    _id: string;
    description: string;
    slugType: string;
    active: boolean;
}