import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserService, ProfilesService, Profile } from '../core';
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
    private cd: ChangeDetectorRef
  ) { 
    this.url_user = this.route.snapshot.paramMap.get('username') || '' ;
  }

  url_user: string = '';
  profile: Profile = {} as Profile;
  currentUser: User = {} as User;
  isUser!: boolean;

  ngOnInit(): void {
    //this.route.data.pipe(concatMap(({ profile: Profile }) => {
        // return this.userService.currentUser.pipe(tap(
        //   (userData: User) => {
        //     this.currentUser = userData;
        //     console.log(userData)
        //     this.isUser = (this.currentUser.username === this.profile.username);
        //   }
        // ));
        this.ProfilService.get(this.url_user).subscribe({
            next: (data) => {
                console.log(data);
                this.profile = data;
            },
            error: (error) => {
                console.log(error)
                this.isUser = true;
                this.router.navigateByUrl('/')
            }
        })    
    //   })
    // ).subscribe((() => {
    //   this.cd.markForCheck();
    // }));
    
    console.log("PROFILE.COMPONENT")
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }

}