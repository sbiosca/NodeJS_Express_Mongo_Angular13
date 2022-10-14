import { Category } from "./category.model";

export class Filters {
    category?: Category[];
    price?: number;
    state?: String;
    location?: String;
    date?: Date;
    brand?: String;
    model?: String;
}