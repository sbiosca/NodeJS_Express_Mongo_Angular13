import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Category  } from "src/app/core/models/category.model";
import { Location } from "@angular/common";
import { ActivatedRoute} from "@angular/router";
import { CategoryService } from "src/app/core/";
import { Filters } from "src/app/core/models/filters.model";
import { ProductComponent } from "../product/product.component";

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})export class FiltersComponent {
    url_filters?: string = '';
    filters!:Filters;
    selected?: Filters;

    @Input() listcategory: Category[] = [];
    @Output() filterEvent: EventEmitter<Filters> = new EventEmitter();

    constructor(private CategoryService: CategoryService,
            private ActivatedRoute: ActivatedRoute,
            private location: Location,
            private prodComp: ProductComponent
            ) {
                this.url_filters = this.ActivatedRoute.snapshot.paramMap.get('filters') || '' ;
            }

    ngOnInit(): void {
        this.start_filters();
        //this.onchange();
        //this.replaceEmit();
    }

    start_filters() {
        if (this.url_filters) {
            this.filters = JSON.parse(atob(this.url_filters));
            this.selected = this.filters;
            console.log(this.selected);
        }
    }

    checkTime(filters: any) {
        setTimeout(() => {
          if (filters === this.filters) this.replaceEmit();
        }, 200);
    }

    onchange(value: any) {
        this.url_filters = this.ActivatedRoute.snapshot.paramMap.get('filters') || '' ;
       
        if (this.url_filters) {
            this.filters = new Filters();
            this.filters = JSON.parse(atob(this.url_filters));
        }else {
            this.filters = new Filters();
        }
        console.log(value.target.id);

        if (value.target.id === "priceMin") {
            this.filters.priceMin = value.target.value;
            console.log("PRICE")
        }
        if (value.target.id === "priceMax") {
            this.filters.priceMax = value.target.value;
            console.log("PRICE")
        }
        if (value.target.id === "cate") {
            this.filters.listcategory = value.target.value;
            console.log("CATE")
        }
        if (value.target.id === "state") {
            this.filters.state = value.target.value;
            console.log("STATE")
        }

        this.checkTime(this.filters);
        
    }

    replaceEmit() {
        this.location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
        this.prodComp.ngOnInit()
        this.filterEvent.emit(this.filters);
        console.log(this.filters)
    }

    delete_filters() {
        this.location.replaceState('/shop/');
    }
}