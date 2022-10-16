import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Category  } from "src/app/core/models/category.model";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { CategoryService } from "src/app/core/";
import { Filters } from "src/app/core/models/filters.model";
@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css']
})export class FiltersComponent {
    category: Category[] = [];
    url_filters?: String | null;
    filters?:Filters;

    constructor(private CategoryService: CategoryService,
            private ActivatedRoute: ActivatedRoute,
            private location: Location) {
                this.url_filters = this.ActivatedRoute.snapshot.paramMap.get('filters') ;
            }

    ngOnInit(): void {
        this.start_filters();
        //this.onchange();
        //this.replaceEmit();
    }

    start_filters() {
        this.CategoryService.getAll().subscribe((data) => {
            console.log(data);
            this.category = data;
        })
    }

    checkTime(filters: any) {
        setTimeout(() => {
          if (filters === this.filters) this.replaceEmit();
        }, 200);
    }

    onchange(value: any) {
        this.url_filters = this.ActivatedRoute.snapshot.paramMap.get('filters') ;
        //this.filters = new Filters()
        //this.filters = JSON.parse(atob(this.url_filters));
        this.filters = value.target.value;
        console.log(this.url_filters);
        this.checkTime(this.filters);
        
    }

    replaceEmit() {
        this.location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
        console.log(this.filters)
    }
}