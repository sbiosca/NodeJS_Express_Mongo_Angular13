import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/core/models/category.model";

import { CategoryService} from "src/app/core/services/category.service";

@Component ({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']

})export class CategoryComponent implements OnInit {

    category: Category[] = [];

    constructor(private CategoryService: CategoryService) {}
    ngOnInit(): void {
        this.AllCategories();
        //this.OneCategory();
    }

    AllCategories() {
        this.CategoryService.getAll().subscribe((data) => {
            this.category = data
        })
    }

    // jump_shop(cate: any) {
    //     console.log(cate);
    //     this.CategoryService.get(cate).subscribe((data) => {
    //         console.log(data.products);
    //     })
    // }

    // OneCategory() {
    //     this.CategoryService.get().subscribe((data) => {
    //         console.log(data);
    //     })
    // }
}