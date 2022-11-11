import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';
import { Product, ProductService, Profile, ProfilesService, UserService } from '../../core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowComponent {
   @Input() profile!: Profile;
   @Input() followed!: boolean;
   @Output() follower = new EventEmitter<Profile>();
    //followed: boolean = false;
  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private ToastrService: ToastrService,
    private profileService: ProfilesService
  ) {}

  toggleFollow() {
    console.log(this.profile)
    if (!this.followed) {
        this.profileService.follow(this.profile.username).subscribe({
            next: (data) => {
                this.followed = true;
                this.ToastrService.success("FOLLOW SUCCESFULLY", "NOW: " + this.profile.username + " IS YOUR FRIEND");
                this.follower.emit(data);
                console.log(data);
            },
            error: (error) => {
                console.log(error)
            }
        })
    } else {
        this.profileService.unfollow(this.profile.username).subscribe({
            next: (data) => {
                this.followed = false;
                this.ToastrService.info("UNFOLLOW SUCCESFULLY", "NOW: " + this.profile.username + " IS YOUR ENEMY");
                this.follower.emit(data);
                console.log(data);
            },
            error: (error) => {
                console.log(error)
            }
        })
    }
      
    }

}
