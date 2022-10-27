import { Component, OnInit,  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { User, UserService } from '../../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    //private cd: ChangeDetectorRef
  ) { }

  //currentUser?: User;
  user: boolean = false;

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        this.user = isAuthenticated;
        console.log(this.user)
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
   }
}