import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export interface Category {
    slug?: any
    reference?: number
    icon?: {
        prefix: IconPrefix
        name: IconName
    }
    name_category?: string
    products?: Category[];

    // constructor (
    //     slug: string,
    //     reference: number,
    //     icon: any,
    //     name_category: string,
    //     products: Category[],
    // ) {
    //     this.reference = reference;
    //     this.icon = icon;
    //     this.name_category = name_category;
    //     this.products = products;
    //     this.slug=slug
    //}
}

