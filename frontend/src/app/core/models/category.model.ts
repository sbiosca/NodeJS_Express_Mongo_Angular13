import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export interface Category {
        slug?: any
        reference?: number
        icon?: {
            prefix: IconPrefix
            name: IconName
        }
        name_category?: string,
        products?: Category[],
        visited?: number;

}

