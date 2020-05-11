export class Cities {
    data: Data[] = [];
    count: number;
}

class Data {
    _id: string;
    description: string;
    uf: string;
    active: boolean;
}