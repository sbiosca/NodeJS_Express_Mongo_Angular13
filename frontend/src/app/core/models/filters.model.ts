import { Category } from "./category.model";

export interface Filters {
    category?: Category[];
    price?: number;
    state?: String;
    location?: String;
    date?: Date;
    brand?: String;
    model?: String;
}