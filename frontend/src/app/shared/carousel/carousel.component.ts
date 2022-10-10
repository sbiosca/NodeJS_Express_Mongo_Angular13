import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/core/models/category.model";

import { CategoryService} from "src/app/core/services/category.service";



@Component ({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']

})export class CarouselComponent {
    
    constructor(private CategoryService: CategoryService) {}
    ngOnInit(): void {
       
    }
}