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
                // this.filtersForm = this.FormBuilde.group({
                //     'priceMin': ['', Validators.required],
                //     'priceMax': ['', Validators.required],
                //     'cate': ['', Validators.required],
                //     'state': ['', Validators.required]
                //   });
            }

    ngOnInit(): void {
        this.start_filters();
        //this.onchange();
        //this.replaceEmit();
    }

    start_filters() {
        if (this.url_filters) {
            this.filters = JSON.parse(atob(this.url_filters));
        }
    }

    checkTime(filters: any) {
        setTimeout(() => {
        if (filters === this.filters) this.replaceEmit();
        }, 500);
    }

    public onchange(value: any): void {
        this.url_filters = this.ActivatedRoute.snapshot.params['filters'] || '' ;
        this.prodComp.ngOnInit();
        if (this.url_filters) {
            this.filters = new Filters();
            this.filters = JSON.parse(atob(this.url_filters));
        }else {
            this.filters = new Filters();
        }
        console.log(value.target.id);

        if (value.target.id === "priceMin") {
            this.filters.priceMin = value.target.value;
            //console.log("PRICE")
        }
        if (value.target.id === "priceMax") {
            this.filters.priceMax = value.target.value;
            //console.log("PRICE")
        }
        if (value.target.id === "cate") {
            this.filters.listcategory = value.target.value;
            console.log("1-"+this.selected)
            this.selected = value.target.value;
            console.log("2-"+this.selected)
        }
        if (value.target.id === "state") {
            this.filters.state = value.target.value;
            //console.log("STATE")
        }
        

        this.checkTime(this.filters);
        this.productcomp.product_categories()
    }

    submit(value: any) {
        //console.log(value.data)
    }

    replaceEmit() {
        //console.log(this.selected)
        this.Router.navigate(['/shop/'  + btoa(JSON.stringify(this.filters))])
        //this.location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
        //this.prodComp.ngOnInit()
        //this.filterEvent.emit(this.filters);
        //console.log(this.filters)
    }
}