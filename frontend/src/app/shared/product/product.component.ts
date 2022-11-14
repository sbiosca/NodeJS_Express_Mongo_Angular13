import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/core/models/product.model";
import { ProductService} from "src/app/core/services/product.service";
import { CategoryService} from "src/app/core/services/category.service";
import { ActivatedRoute } from '@angular/router';
import { Category, Filters } from "src/app/core";
import { Location } from "@angular/common";
// import { Category } from "src/app/core/models/category.model";

@Component ({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
    @Input() profile_products?: Product[];
    product: Product[] = [];
    p!: number;
    value_product!: Number;
    ref_Category: String = '';
    url_filters: string = '';
    filters = new Filters();
    listcategory: Category[] = [];
    product_favorite!: Product; 
    canModify!: boolean;
    //products!: Product;
    heart_color: boolean = false;
    favorites: Product[] = [];
    filters_change!: string;
    
    constructor(private ProductService: ProductService
        , private CategoryService: CategoryService,
        private ActivatedRoute: ActivatedRoute,
        private location: Location) {
        }
    ngOnInit() {
        this.ref_Category = this.ActivatedRoute.snapshot.paramMap.get('id') || '';
        this.url_filters = this.ActivatedRoute.snapshot.paramMap.get('filters') || '';
        this.product_categories();
        this.list_categories();
        //console.log(this.url_filters)
        // this.ProductService.getfavorite().subscribe((data)=> {
        //     this.favorites = data;
        //     console.log(this.favorites)
        // })
        //this.heart_color;
    }

    product_categories() {
        console.log(this.url_filters)  
        if (this.ref_Category != "favorites") {
            if ((this.ref_Category == '' ) && (this.url_filters == 'e30')) {
                this.ProductService.getAll().subscribe((data) => {
                    this.product = data;
                    console.log(data);
                })
            }else if((this.ref_Category != '') && (this.url_filters == 'e30')) {
                //console.log(this.ref_Category);
                this.CategoryService.get(this.ref_Category).subscribe((data) => {
                    this.listcategory = data.products!;
                    console.log(data);
                    this.product = data.products!;

                })
            }else if((this.ref_Category == '') && (this.url_filters != 'e30')){
                this.filtered_products(this.url_filters);
    
                // this.url_filters = JSON.parse(atob(this.url_filters));
                // this.CategoryService.get(this.url_filters).subscribe((data) => {
                //     console.log(data.products);
                //     this.listcategory = data.products!;
                //     this.product = data.products!;
                // })
            }
        }else {
            this.profile_favorites();
            console.log(this.ref_Category)
        }
       
    }

    list_categories() {
        this.CategoryService.getAll().subscribe((data) => {
            setTimeout(() => {
                this.listcategory = data;
            }, 50);
            console.table(this.listcategory)
        })
    }

    filtered_products(value: any) {
        this.filters = JSON.parse(atob(value));
        console.log(this.filters);
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

    output_filters(value: any) {
        console.log(value)
        // this.url_filters = atob(JSON.stringify(this.url_filters))
        // console.log(this.url_filters)
        this.url_filters = btoa(JSON.stringify(value + this.url_filters));
        this.filters_change = this.url_filters;
        this.product_categories();
        console.log(this.filters_change);
    }

    profile_favorites() {
        this.ProductService.getfavorite().subscribe((data)=> {
            this.product = data;
            console.log(data)
            document.documentElement.scrollTop = 0;
        })
    }    
}


