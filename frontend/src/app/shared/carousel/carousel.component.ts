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
        

    }
    ngOnInit() {
        this.Categories.getAll().subscribe((data) => {
            this.category = data 
})
    }

}