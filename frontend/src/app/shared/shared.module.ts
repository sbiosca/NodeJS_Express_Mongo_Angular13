import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
//import {CarouselModule} from 'primeng/carousel';
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";
//import { CarouselComponent } from "./carousel/carousel.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        //CarouselModule
    ],
    declarations: [
        CategoryComponent,
        ProductComponent,
        // CarouselComponent
        
    ],
    exports: [
        CategoryComponent,
        ProductComponent,
        // CarouselComponent        
    ]
})
export class SharedModule{}