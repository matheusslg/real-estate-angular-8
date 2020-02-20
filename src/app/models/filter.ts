export class Filter {
    title: String;
    address: String;
    locations: String[] = [];
    categories: String[] = [];
    types: String[] = [];
    cities: String[] = [];
    bedroomsMin: Number;
    bedroomsMax: Number;
    toiletsMin: Number;
    toiletsMax: Number;
    garageMin: Number;
    garageMax: Number;
    priceType: String = 'all';
    priceRange: any;
    priceMin: Number;
    priceMax: Number;
    sizeType: String = 'metro';
    sizeMin: Number;
    sizeMax: Number;
    featured: Boolean;
}