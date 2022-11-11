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
    ref_Category: String = '';
    view_filters: boolean = true;
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
                this.url_filters = this.ActivatedRoute.snapshot.params['filters'] || '' ;
                this.ActivatedRoute.url.subscribe((data) => {
                    if (data[1].path) {
                        setTimeout(() => {
                            this.home_category = parseInt(data[1].path)
                        }, 100);
                    }
                })
                this.ref_Category = this.ActivatedRoute.snapshot.paramMap.get('id') || ''
            }

    ngOnInit(): void {
        this.start_filters();
        if (this.ref_Category === "favorites"){
            this.view_filters = false;
        }
    }

    start_filters() {
        this.prodComp.ngOnInit();
        if (this.url_filters) {
            console.log("3")
            this.filters = JSON.parse(atob(this.url_filters));
            this.replaceEmit()
            console.log(this.filters)
        }
    }

    checkTime(filters: any) {
        console.log("5")
        setTimeout(() => {
        if (filters === this.filters) this.replaceEmit();
        }, 500);
    }

    public onchange(value: any): void {

        //console.log(value)
        this.filters = new Filters();
        this.url_filters = this.ActivatedRoute.snapshot.params['filters'] || '' ;
        if (this.url_filters) {
            this.filters = JSON.parse(atob(this.url_filters));
            console.log(this.filters)
        }

        if (value.target.id === "priceMin") {
            console.log(value.data)
            this.filters.priceMin = value.target.value;
            //console.log("PRICE")
        }
        if (value.target.id === "priceMax") {
            this.filters.priceMax = value.target.value;
            //console.log("PRICE")
        }
        if (value.target.id === "cate") {
            console.log(value)
            this.filters.listcategory = value.target.value;
            console.log(this.filters.listcategory)
        }
        if (value.target.id === "state") {
            this.filters.state = value.target.value;
            //console.log("STATE")
        }
        console.log("4")

        this.checkTime(this.filters);
        this.productcomp.product_categories()
    }

    submit(value: any) {
        //console.log(value.data)
    }

    replaceEmit() {
        this.Router.navigate(['/shop/'  + btoa(JSON.stringify(this.filters))])
    }
}