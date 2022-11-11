import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserService, ProfilesService, Profile, ProductService, Product } from '../core';

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
  followed: boolean = false;
  url_user: string = '';
  profile: Profile = {} as Profile;
  currentUser: User = {} as User;
  isUser!: boolean;
  favorites?: Product;

  ngOnInit(): void {
    this.ProfilService.get(this.url_user).subscribe({
      next: (data) => {
          
          for (let i = 0; i < data.followers.length; i++) {
            if (data.followers[i] === this.userService.getCurrentUser().id) {
                this.followed = true
            } 
          }
          this.profile = data;
          this.currentUser = this.userService.getCurrentUser();
          console.log(data)
      },
      error: (error) => {
          console.log(error)
          this.isUser = true;
          this.router.navigateByUrl('/')
      }
    })     
    this.productService.getfavorite().subscribe((data)=> {
      this.favorites = data;
      console.log(data);
    })
    console.log(this.url_user);
  }

  follow_toggle(value: any) { 
    console.log(value);
    this.profile = value;
  }

}