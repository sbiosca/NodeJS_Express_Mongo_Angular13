import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';

import { Product, ProductService, UserService } from '../../core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent {
  @Input() products?: Product;
  //INPUT OF PRODUCT IN DETAILS HAVE LIKE OR NOT LIKE
  @Input() heart_color?: boolean;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  highfav!: Product;
 

  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private ToastrService: ToastrService
  ) {}

  
  //faHeart  = faHeart;
  
  toggleFavorite() {
    console.log(this.products)
    this.isSubmitting = true;
    //this.heart_color = false;
    console.log(this.heart_color)
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/auth/login');
          this.ToastrService.error("YOU MUST LOG IN YOUR ACCOUNT");
          return of(null);
        }
        
        if (!this.heart_color) {
          return this.productService.favorite(this.products?.slug)
          .pipe(tap( {
            next: (data) => {
                this.isSubmitting = false;
                //this.toggle.emit(true);
                console.log(data)
                this.products = data;
                this.heart_color = data.favorited!;
                this.ToastrService.success("PRODUCT ADDED TO FAVORITE: " +  data.name);
            },
            error: (error) => {
                this.isSubmitting = false
            }
          }
            
          ));

        // Otherwise, unfavorite the article
        } else {
          return this.productService.unfavorite(this.products?.slug)
          .pipe(tap({
              next: (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                  console.log(data)
                  this.products = data;
                  this.heart_color =  data.favorited!;
                  this.ToastrService.info("PRODUCT DELETED TO FAVORITE: " +  data.name)
              },
              error: (error) => {
                  this.isSubmitting = false
              }
              }
          ));
        }

      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
  }

  highfavorite_prod() {
    console.log("holas")
  }
}
