import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserService, ProfilesService, Profile, ProductService, Product } from '../core';
import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private ProfilService: ProfilesService,
    private productService: ProductService
  ) { 
    this.url_user = this.route.snapshot.paramMap.get('username') || '' ;
  }

  url_user: string = '';
  profile: Profile = {} as Profile;
  currentUser: User = {} as User;
  isUser!: boolean;
  favorites?: Product;

  ngOnInit(): void {
    this.ProfilService.get(this.url_user).subscribe({
      next: (data) => {
          console.log(data);
          this.profile = data;
          this.currentUser = this.userService.getCurrentUser();
      },
      error: (error) => {
          console.log(error)
          this.isUser = true;
          this.router.navigateByUrl('/')
      }
    })     
    this.productService.getfavorite().subscribe((data)=> {
      //this.products = data;
      this.favorites = data;
      console.log(data);
    })
  }

  // onToggleFollowing(following: boolean) {
  //   this.profile.following = following;
  // }

}