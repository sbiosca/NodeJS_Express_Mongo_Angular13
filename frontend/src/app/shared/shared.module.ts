import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
//import {CarouselModule} from 'primeng/carousel';
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { SearchComponent } from "./search/search.component";
import { FiltersComponent } from "./filters/filters.component";
import { NgxPaginationModule } from "ngx-pagination";
import {CarouselModule} from 'primeng/carousel';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { CarouselComponent } from "./carousel/carousel.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        NgxPaginationModule,
       // NgbModule
        CarouselModule,
        FormsModule,
        ReactiveFormsModule
        // NgbModule
        //CarouselModule
    ],
    declarations: [
        CategoryComponent,
        ProductComponent,
        SearchComponent,
        CarouselComponent,    
        FiltersComponent,
        
        // CarouselComponent
        
    ],
    exports: [
        CategoryComponent,
        ProductComponent,
        SearchComponent,
        CarouselComponent,
        FiltersComponent,
        FormsModule,
        ReactiveFormsModule
        // CarouselComponent        
    ]
})
export class SharedModule{}