import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/core/models/product.model";
import { ProductService} from "src/app/core/services/product.service";
import { CategoryService} from "src/app/core/services/category.service";
import { ActivatedRoute } from '@angular/router';
import { Category, Filters } from "src/app/core";

// import { Category } from "src/app/core/models/category.model";

@Component ({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
    product: Product[] = [];
    p!: number;
    value_product!: Number;
    ref_Category: String = '';
    url_filters: string = '';
    filters = new Filters();
    listcategory: Category[] = [];
    product_favorite!: Product; 
    canModify!: boolean;
    products!: Product;
    heart_color: boolean = false;
    

    @Input() set config(filters: Filters) {

        if (filters) {
          console.log("FILTROS")
        }
    }

      
    constructor(private ProductService: ProductService
        , private CategoryService: CategoryService,
        private ActivatedRoute: ActivatedRoute,) {
        }
    ngOnInit(): void {
        this.ref_Category =
            this.ActivatedRoute.snapshot.paramMap.get('id') || '';
        this.url_filters =
            this.ActivatedRoute.snapshot.params['filters'] || '';
        this.product_categories();
        this.list_categories();
        console.log(this.ref_Category)
        //this.heart_color;
    }

    product_categories() {
        //console.log(this.url_filters)
        if (this.ref_Category != "favorites") {
            if ((this.ref_Category == '' ) && (this.url_filters == '')) {
                this.ProductService.getAll().subscribe((data) => {
                    this.product = data;

                    //console.log(data);
                })
            }else if((this.ref_Category != '') && (this.url_filters == '')) {
                //console.log(this.ref_Category);
                this.CategoryService.get(this.ref_Category).subscribe((data) => {
                    this.listcategory = data.products!;
                    console.log(data);
                    this.product = data.products!;

                })
            }else if((this.ref_Category == '') && (this.url_filters != '')){
                this.filtered_products(this.url_filters);
    
                // this.url_filters = JSON.parse(atob(this.url_filters));
                // this.CategoryService.get(this.url_filters).subscribe((data) => {
                //     console.log(data.products);
                //     this.listcategory = data.products!;
                //     this.product = data.products!;
                // })
            }
        }else {
            this.profile_favorites()
        }
       
    }

    list_categories() {
        this.CategoryService.getAll().subscribe((data) => {
            this.listcategory = data;
            this.listcategory = this.listcategory.filter((value) => value.reference!=-1)
        })
    }

    filtered_products(value: any) {
        this.filters = JSON.parse(atob(value));
        //console.log(this.filters);
        if (this.filters.listcategory) {
            this.CategoryService.get(this.filters.listcategory).subscribe((data) => {
                //console.log(data)
                this.product = data.products!;
            })
        }
        if (this.filters.priceMax || this.filters.priceMin || this.filters.state || this.filters.name) {
            this.ProductService.getFilters(this.filters).subscribe((data) => {
                this.product = data;
            })
        }
        
    }

    profile_favorites() {
        this.ProductService.getfavorite().subscribe((data)=> {
            this.product = data;
            console.log(data)
        })
    }    
}


