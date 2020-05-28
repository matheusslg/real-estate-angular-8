export class SlugType {
    data: Data = new Data();
    count: number;
}

class Data {
    _id: string;
    description: string;
    slug: string;
    type: string;
    showOnApp: boolean;
    active: boolean;
}