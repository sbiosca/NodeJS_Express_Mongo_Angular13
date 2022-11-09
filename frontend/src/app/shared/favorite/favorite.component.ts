import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { Product, ProductService, UserService } from '../../core';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

    @Input() products?: Product;
    @Output() toggle = new EventEmitter<boolean>();
    isSubmitting = false;
    heart_color: boolean = false;
  //faHeart  = faHeart;
  ngOnInit() {
    this.productService.getfavorite().subscribe((data)=> {
        //this.products = data;
        console.log(data);
      })
  }
  toggleFavorite() {
    
    console.log(this.products)
    this.isSubmitting = true;
    this.heart_color = false;
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/auth/login');
          return of(null);
        }
        
        if (!this.products?.favorited) {
          return this.productService.favorite(this.products?.slug)
          .pipe(tap( {
            next: (data) => {
                this.isSubmitting = false;
                this.toggle.emit(true);
                console.log(data)
                this.products = data;
                this.heart_color = data.favorited!;
            },
            error: (error) => {
                this.isSubmitting = false
            }
          }
            
          ));

        // Otherwise, unfavorite the article
        } else {
          return this.productService.unfavorite(this.products.slug)
          .pipe(tap({
              next: (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                  console.log(data)
                  this.products = data;
                  this.heart_color =  data.favorited!;
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
}
