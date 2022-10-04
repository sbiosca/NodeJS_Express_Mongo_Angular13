import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CategoryComponent } from "./category/category.component";

@NgModule({
    imports: [
        CommonModule,

    ],
    declarations: [
        CategoryComponent
    ],
    exports: [
        CategoryComponent
    ]
})
export class SharedModule{}