import { Component, OnInit} from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { Comment } from '../core/models/comment.module';
import { CommentsService } from '../core/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../core/models/product.model';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  slug?: string = '';
  products!: Product;
  images: String[] = [];
  error!: boolean;
  comments!: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;
  img_products?: [];
  user: User = {} as User;
  token!: String;
  product_favorite!: Product; 
  heart_color: boolean = false;
  
  constructor(
    private ProductService: ProductService,
    private ActivateRoute: ActivatedRoute,
    private CommentsService: CommentsService,
    private router: Router,
    private ToastrService: ToastrService,
    private userService: UserService,
  ) {
    this.slug = this.ActivateRoute.snapshot.paramMap.get('slug') || '';
  }
  
  ngOnInit() {
    this.product_details();
    document.documentElement.scrollTop = 0;
    //HIGHLIGHT FAVORITE
    this.ProductService.getfavorite().subscribe((data)=> {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (this.slug === data[i].slug) {
          console.log("PRODUCT: " + data[i].name);
          this.heart_color = data[i].favorited!;
      }
    }})
  }
  product_details() {
    console.log(this.slug)
    this.ProductService.get(this.slug).subscribe((data) => {
      this.products = data;
      this.img_products = data.img;
      this.getComments();
      console.log(this.products);
    })
  }

  // getMyUser() {
  //   this.userService.currentUser.subscribe((userData: User) => {
  //     this.currentUser = userData;
  //     // /* console.log(userData); */
  //     // console.log(this.product.author)
  //     // console.log(this.currentUser.username)

  //     this.canModify = String(this.currentUser.username) === String(this.product.author?.username);
  //     this.cd.markForCheck();
  //   });
  // }

  getComments() {
    if (this.products.slug) {
      this.CommentsService.getAll(this.products.slug).subscribe((comments) => {
        this.comments = comments;
        this.user = this.userService.getCurrentUser();
      });
    }
  }

  addComment() {
    this.error = false;
    this.commentFormErrors = {};
    if (this.products.slug) {
      const commentvalue = this.commentControl.value;
      if (commentvalue === null) {
        console.log(commentvalue)
        this.error = true;
      }else {
        this.error = false;
        this.CommentsService.add(this.products.slug, commentvalue).subscribe({
          next: (data) => {
            console.log(data);
            this.comments.unshift(data);
            this.commentControl.reset('');
          },
          error: (errors) => {
            console.log(errors)
            this.router.navigateByUrl('/auth/login');
            this.ToastrService.error("ERROR COMMENT", "You must have a account to write a comment")
          }
        });
      }
      
    }
  }

  delete_comment(comment:any) {
    console.log(comment)
      if (this.products.slug) {
      this.CommentsService.destroy(comment, this.products.slug)
        .subscribe({
          next: () => {
            this.getComments();
          }, 
          error: (error) => {
            console.log(error)
          }
          }
        );
    }
  }
}