export class Property {
    data: Data = new Data();
    count: number;
}

class Data {
    _id: string;
    title: string;
    description: string;
    address: string;
    locations: string[] = [];
    categories: string[] = [];
    types: string[] = [];
    city: string;
    geolocation: string;
    tags: string[] = [];
    images: string[] = [];
    priceNumber: number;
    priceCustom: string;
    active: boolean;
    createdBy: string;
    updatedAt: string;
}