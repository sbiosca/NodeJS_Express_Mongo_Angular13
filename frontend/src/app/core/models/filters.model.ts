import { Category } from "./category.model";

export class Filters {
    listcategory?: Category[];
    price?: number;
    state?: String;
    location?: String;
    date?: Date;
    brand?: String;
    model?: String;
}