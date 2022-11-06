import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
//import {CarouselModule} from 'primeng/carousel';
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { InfinitescrollComponent } from "./infinitescroll/infinitescroll.component"
import { SearchComponent } from "./search/search.component";
import { FiltersComponent } from "./filters/filters.component";
import { NgxPaginationModule } from "ngx-pagination";
import {CarouselModule} from 'primeng/carousel';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
//import { ListErrorsComponent } from './list-errors.component';
//import { ShowAuthedDirective } from "./show-authed.directive";
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
        InfiniteScrollModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        // NgbModule
        //CarouselModule
    ],
    declarations: [
        CategoryComponent,
        ProductComponent,
        SearchComponent,
        CarouselComponent,
        InfinitescrollComponent,
        FiltersComponent,
        //ListErrorsComponent
        //ShowAuthedDirective
        // CarouselComponent
        
    ],
    exports: [
        CategoryComponent,
        ProductComponent,
        SearchComponent,
        CarouselComponent,
        InfinitescrollComponent,
        FiltersComponent,
        FormsModule,
        ReactiveFormsModule,
        //ListErrorsComponent
        //ShowAuthedDirective
        // CarouselComponent        
    ]
})
export class SharedModule{}