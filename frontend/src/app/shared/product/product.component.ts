import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/core/models/product.model";
import { ProductService} from "src/app/core/services/product.service";
import { CategoryService} from "src/app/core/services/category.service";
import { ActivatedRoute } from '@angular/router';
import { Category } from "src/app/core/models/category.model";

@Component ({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
    product?: Product[];
    product_category?: Category;
    ref_Category: String = '';

    constructor(private ProductService: ProductService
        , private CategoryService: CategoryService,
        private ActivatedRoute: ActivatedRoute) {}
    ngOnInit(): void {
        this.ref_Category =
            this.ActivatedRoute.snapshot.paramMap.get('id') || '';
        //this.AllProducts();
        this.product_categories();
    }

    // AllProducts() {
    //     this.ProductService.getAll().subscribe((data) => {
    //         console.log(data);
    //         this.product = data;
    //     })
    // }

    product_categories() {
        if (this.ref_Category == '') {
            this.ProductService.getAll().subscribe((data) => {
                console.log(data);
                this.product = data;
            })
        }else {
            console.log(this.ref_Category);
            this.CategoryService.get(this.ref_Category).subscribe((data) => {
                console.log(data.products);
                this.product_category = data;
            })
        }
        
    }
 
    jump_shop1() {
        
    }
    
}