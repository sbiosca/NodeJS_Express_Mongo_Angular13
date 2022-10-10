import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        
    ],
    declarations: [
        CategoryComponent,
        ProductComponent,
        
    ],
    exports: [
        CategoryComponent,
        ProductComponent,
        
    ]
})
export class SharedModule{}