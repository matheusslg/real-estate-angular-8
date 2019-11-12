export class Image {
    data: Data = new Data();
    count: number;
}

class Data {
    _id: string;
    description: string;
    fileName: string;
    filePath: string;
    isFeatured: boolean;
}