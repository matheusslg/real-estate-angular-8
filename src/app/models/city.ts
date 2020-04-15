export class City {
    data: Data = new Data();
    count: number;
}

class Data {
    _id: string;
    description: string;
    active: boolean;
}