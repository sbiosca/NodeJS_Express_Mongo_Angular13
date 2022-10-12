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
    //product_category?: Product[];
    ref_Category: String = '';
    ref_pagination: String = '';

    constructor(private ProductService: ProductService
        , private CategoryService: CategoryService,
        private ActivatedRoute: ActivatedRoute) {}
    ngOnInit(): void {
        
        this.ref_Category =
            this.ActivatedRoute.snapshot.paramMap.get('id') || '';
        this.ref_pagination =
            this.ActivatedRoute.snapshot.paramMap.get('page') || '';
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
        if (this.ref_Category == '' && this.ref_pagination == '' ) {
            this.ProductService.getAll().subscribe((data) => {
                let dato = data.splice(0,8)
                console.log(dato);
                this.product = dato;
            })
        }else if(this.ref_Category != '') {
            console.log(this.ref_Category);
            this.CategoryService.get(this.ref_Category).subscribe((data) => {
                console.log(data.products);
                this.product = data.products;
            })
        }else {
            console.log(this.ref_pagination);
            this.ProductService.get(this.ref_pagination).subscribe((data) => {
                if (this.ref_pagination === "1") {
                    let dato = data.splice(8,8)
                    console.log(dato);
                    this.product = dato;
                }else if (this.ref_pagination === "2") {
                    let dato = data.splice(16,16)
                    console.log(dato);
                    this.product = dato;
                }
                
            })
        }
        
    }
 
    product_pagination() {
        console.log("AAA")
        location.reload();
    }
    jump_shop1() {
        
    }
    
}


