import { Component, OnInit} from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../core/models/product.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  slug?: string = '';
  products!: Product;
  //img_products?: [];
  constructor(
    private ProductService: ProductService,
    private ActivateRoute: ActivatedRoute
  ) {
    this.slug = this.ActivateRoute.snapshot.paramMap.get('slug') || '';
  }
  
  ngOnInit() {
    this.product_details();
  }
  product_details() {
    console.log(this.slug)
    this.ProductService.get(this.slug).subscribe((data) => {
      this.products = data;
      //this.img_products = data.img;
      console.log(this.products);
    })
  }
}