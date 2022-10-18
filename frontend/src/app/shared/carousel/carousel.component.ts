import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Category } from "src/app/core/models/category.model";
import { CategoryService} from "src/app/core/services/category.service";



@Component ({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    encapsulation: ViewEncapsulation.None,

})export class CarouselComponent {
    
    category: Category[] = [];
    constructor(private Categories: CategoryService) {
        // this.responsiveOptions = [
        //     {
        //         breakpoint: '1024px',
        //         numVisible: 3,
        //         numScroll: 3
        //     },
        //     {
        //         breakpoint: '768px',
        //         numVisible: 2,
        //         numScroll: 2
        //     },
        //     {
        //         breakpoint: '560px',
        //         numVisible: 1,
        //         numScroll: 1
        //     }
        // ];

    }
    ngOnInit() {
        this.Categories.getAll().subscribe((data) => {
            this.category = data 
            console.log(this.category)       
})
    }

}