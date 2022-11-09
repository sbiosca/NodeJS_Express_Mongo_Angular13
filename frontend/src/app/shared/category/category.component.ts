import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Category } from "src/app/core/models/category.model";
import { CategoryService} from "src/app/core/services/category.service";

@Component ({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']

})export class CategoryComponent implements OnInit {

    category: Category[] = [];
    category_mv: Category[] = [];
    actualPage: number;
    finishPage: number;
    showGoUpButton: boolean;
    list = [1,2,3,4]
    constructor(private CategoryService: CategoryService,private spinner: NgxSpinnerService) {
        this.actualPage = 1;
        this.showGoUpButton = false;
        this.finishPage = 3;
    }
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

    scrollTop() {
        document.documentElement.scrollTop = 0;
    }
    onScroll() {
        this.spinner.show()
        this.showGoUpButton = false;
        setTimeout(() => {
            this.spinner.hide()
        }, 900);
        if (this.list.length < 6) {
            this.list.push(1,2,3,4)
        }
        
    }
    MorevisitedCategories() {
        this.CategoryService.getAll().subscribe((data) => {
            data = data.filter((item) => item.reference != -1)
            this.category_mv = data.sort(((a, b) => b.visited! - a.visited!)).slice(0,3);
            console.table(this.category_mv)
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