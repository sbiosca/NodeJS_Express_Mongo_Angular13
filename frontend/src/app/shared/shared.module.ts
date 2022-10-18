import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
//import {CarouselModule} from 'primeng/carousel';
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";
import { CarouselComponent } from "./carousel/carousel.component";
<<<<<<< HEAD
import { FiltersComponent } from "./filters/filters.component";
import { NgxPaginationModule } from "ngx-pagination";
=======
import {CarouselModule} from 'primeng/carousel';
>>>>>>> home
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { CarouselComponent } from "./carousel/carousel.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
<<<<<<< HEAD
        NgxPaginationModule,
       // NgbModule
=======
        CarouselModule
        // NgbModule
>>>>>>> home
        //CarouselModule
    ],
    declarations: [
        CategoryComponent,
        ProductComponent,
        CarouselComponent,
<<<<<<< HEAD
        FiltersComponent,
=======
        
>>>>>>> home
        // CarouselComponent
        
    ],
    exports: [
        CategoryComponent,
        ProductComponent,
        CarouselComponent,
        FiltersComponent
        // CarouselComponent        
    ]
})
export class SharedModule{}