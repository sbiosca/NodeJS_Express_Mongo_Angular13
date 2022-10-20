import { Category } from "./category.model";

export class Filters {
    listcategory?: Category[];
    priceMax?: number;
    priceMin?: number;
    state?: String;
    location?: String;
    date?: Date;
    brand?: String;
    model?: String;
}