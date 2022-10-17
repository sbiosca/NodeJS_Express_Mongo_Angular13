import { Component, OnInit} from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  slug?: string = '';
  product?: Product[];
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
      console.log(data);
      this.product = data;
    })
  }
}