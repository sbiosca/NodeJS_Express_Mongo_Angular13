import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, Product, Filters } from '../../core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() searchEvent: EventEmitter<Filters> = new EventEmitter();

  url_filters: string | null;
  searchValue: string | undefined = '';
  filters: Filters = new Filters();
  search: any;
  search_highligh?: string;
  products!: Product[];
    constructor(
        private Router: Router,
        private ActivatedRoute: ActivatedRoute,
        private location: Location,
        private ProdService: ProductService,
        private Location: Location
    ){
      this.url_filters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    }
    ngOnInit(): void {
      
      this.filters_Search();
        
    }

    List_products() {
      this.searchValue = this.filters.name || undefined;
      this.ProdService.getProductsSearch(this.search).subscribe(
        (data) => {
          console.log(data);
          this.products = data;
        },
        (error) => {
          console.log(error);
        }
      )
    }

    private checkTime(value: any) {
      let isShop: string = this.Router.url.split('/')[1];
      setTimeout(() => {
        if (value === this.search) {
          if (isShop === 'shop') {
            this.notNamefilters();
            this.searchEvent.emit(this.filters);
            this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
          }
          if (this.search.length != 0)  this.List_products();
        }
      }, 200);
    }

    filters_Search() {
      if (this.url_filters !== null) {
        this.filters = JSON.parse(atob(this.url_filters));
        console.log(this.filters)
      }
      this.search_highligh = this.filters.name;
      this.List_products();
      console.log(this.url_filters)
    }

    public enter_key(data: any): void {
      console.log(data)
      if (typeof data.searchValue === 'string') {
        this.filters.name = data.searchValue;
        this.location.replaceState('/shop/'  + btoa(JSON.stringify(this.filters)))
        window.location.reload()      }
    }
  
    public writting_search(value: any): void {
      console.log(value);
      this.url_filters = this.ActivatedRoute.snapshot.paramMap.get('filters'); 
      console.log(this.url_filters);
      this.search = value;
      this.checkTime(value);
    }


    public notNamefilters() {
      this.url_filters = this.ActivatedRoute.snapshot.paramMap.get('filters');
      console.log(this.url_filters);
      if (this.url_filters !== null) {
        this.filters = JSON.parse(atob(this.url_filters));
      }
      this.filters.name = this.search;
    }
}