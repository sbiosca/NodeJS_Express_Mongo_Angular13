import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, Product, Filters } from '../../core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  url_filters: string | null;
  searchValue: string | undefined = '';
  filters: Filters = new Filters();

    constructor(
        private Router: Router,
        private ActivatedRoute: ActivatedRoute,
        private ProdService: ProductService
    ){
      this.url_filters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    }
    ngOnInit(): void {
        this.filters_Search();
        //this.searchValue = this.filters.name || undefined;
    }

    filters_Search() {
      if (this.url_filters !== null) {
        this.filters = JSON.parse(atob(this.url_filters));
        console.log(this.filters)
      }
      console.log(this.url_filters)
    }
}