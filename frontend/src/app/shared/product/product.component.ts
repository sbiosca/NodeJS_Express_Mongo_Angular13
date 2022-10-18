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
    product!: Product[];
    p!: number;
    value_product!: Number;
    ref_Category: String = '';
    url_filters: string = '';
    filters = new Filters();
    listcategory: Category[] = []; 

    @Input() set config(filters: Filters) {
        if (filters) {
          console.log("FILTROS")
        }
      }

    constructor(private ProductService: ProductService
        , private CategoryService: CategoryService,
        private ActivatedRoute: ActivatedRoute) {}
    ngOnInit(): void {
        this.ref_Category =
            this.ActivatedRoute.snapshot.paramMap.get('id') || '';
        this.url_filters =
            this.ActivatedRoute.snapshot.paramMap.get('filters') || '';
        this.product_categories();
        this.list_categories();
    }

    product_categories() {
        if ((this.ref_Category == '' ) && (this.url_filters == '')) {
            this.ProductService.getAll().subscribe((data) => {
                this.product = data;
            })
            //console.log("1");
        }else if((this.ref_Category != '') && (this.url_filters == '')) {
            //console.log(this.ref_Category);
            this.CategoryService.get(this.ref_Category).subscribe((data) => {
                this.listcategory = data.products!;
                console.log(data.products);
                this.product = data.products!;
            })
            //console.log("2");
        }else if((this.ref_Category == '') && (this.url_filters != '')){
            console.log()
            this.url_filters = JSON.parse(atob(this.url_filters));
            this.CategoryService.get(this.url_filters).subscribe((data) => {
                console.log(data.products);
                this.listcategory = data.products!;
                this.product = data.products!;
            })
            //console.log("3");
        }
    }

    list_categories() {
        this.CategoryService.getAll().subscribe((data) => {
            this.listcategory = data;
            console.log(data)
        })
    }
 
    // refresRouteFilter() {
    //     this.url_filters =
    //         this.ActivatedRoute.snapshot.paramMap.get('filters') || '';
    //     if(typeof(this.url_filters) == "string" ){
    //       //this.filters = JSON.parse(atob(this.url_filters));
    //       console.log(this.filters);
    //     }else{
    //       this.filters = new Filters();
    //     }
    //   }
    
}


