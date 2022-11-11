import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Category  } from "src/app/core/models/category.model";
import { Location } from "@angular/common";
import { ActivatedRoute ,Router} from "@angular/router";
import { Filters } from "src/app/core/models/filters.model";
import { ProductComponent } from "../product/product.component";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})export class FiltersComponent {
    url_filters?: string = '';
    filters!:Filters;
    selected?: string;
    home_category?: number;
    //filtersForm: FormGroup;

    @Input() listcategory: Category[] = [];
    @Output() filterEvent: EventEmitter<Filters> = new EventEmitter();

    constructor(private productcomp: ProductComponent,
            private ActivatedRoute: ActivatedRoute,
            private Router: Router,
            private location: Location,
            private FormBuilde: FormBuilder,
            private prodComp: ProductComponent
            ) {
                this.url_filters = this.ActivatedRoute.snapshot.params['filters'] || '';
            }

    ngOnInit(): void {
        this.start_filters();
    }

    start_filters() {
        this.ActivatedRoute.url.subscribe((data) => {
            if (data[1].path) {
                this.home_category = parseInt(data[1].path)
                // this.filters = new Filters();
                // this.filters = {listcategory: []}
                //this.replaceEmit()
            } 
        })
        // if (this.url_filters) {
        //     this.filters = JSON.parse(atob(this.url_filters));
        //     console.log(this.filters)
        //     this.replaceEmit()
        // }
    }

    checkTime(filters: any) {
        setTimeout(() => {
        if (filters === this.filters) this.replaceEmit();
        }, 100);
    }

    public onchange(value: any): void {

        this.filters = new Filters();
        this.url_filters = this.ActivatedRoute.snapshot.params['filters'] || '' ;

        if (this.url_filters) {
            this.filters = JSON.parse(atob(this.url_filters));
            //console.log(this.filters)
        }

        if (value.target.id === "priceMin") {
            //console.log(value.data)
            this.filters.priceMin = value.target.value;
            ////console.log("PRICE")
        }
        if (value.target.id === "priceMax") {
            this.filters.priceMax = value.target.value;
            ////console.log("PRICE")
        }
        if (value.target.id === "cate") {
            this.filters.listcategory = value.target.value;
            this.home_category = value.target.value
            //console.log(this.filters.listcategory)
        }
        if (value.target.id === "state") {
            this.filters.state = value.target.value;
            ////console.log("STATE")
        }
        
        this.checkTime(this.filters);
        this.prodComp.ngOnInit();
        this.productcomp.product_categories()
    }

    replaceEmit() {
        this.location.replaceState('/shop/'  + btoa(JSON.stringify(this.filters)))
    }
}