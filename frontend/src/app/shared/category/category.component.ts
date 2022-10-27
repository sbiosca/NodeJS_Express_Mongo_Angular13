import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/core/models/category.model";
import { CategoryService} from "src/app/core/services/category.service";

@Component ({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']

})export class CategoryComponent implements OnInit {

    category: Category[] = [];
    category_mv: Category[] = [];
    constructor(private CategoryService: CategoryService) {}
    ngOnInit(): void {
        this.AllCategories();
        this.MorevisitedCategories();
        //this.OneCategory();
    }

    AllCategories() {
        this.CategoryService.getAll().subscribe((data) => {
            this.category = data
        })
    }

    MorevisitedCategories() {
        this.CategoryService.getAll().subscribe((data) => {
            this.category_mv = data.sort(((a, b) => b.visited! - a.visited!));
            this.category_mv = this.category_mv.slice(0,3)
            console.log(this.category_mv)
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