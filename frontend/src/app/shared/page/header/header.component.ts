import { Component, OnInit,  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { User, UserService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
    //private cd: ChangeDetectorRef
  ) { }

  //currentUser?: User;
  user: boolean = false;
  currentUser!: User;

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        this.user = isAuthenticated;
        console.log(this.user)
      }
    )
    this.userService.currentUser.subscribe(
      (data) => {
        this.currentUser = data;
        console.log(this.currentUser)
      }
    )

    // this.userService.currentUser.subscribe(
    //   (userData) => {
    //     this.currentUser = userData;
    //     this.cd.markForCheck();
    //   }
    // );
   }


   delete_user() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
   }
}