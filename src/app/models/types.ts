export class Types {
    data: Data[] = [];
    count: number;
}

class Data {
    _id: string;
    description: string;
    slugType: string;
    active: boolean;
}