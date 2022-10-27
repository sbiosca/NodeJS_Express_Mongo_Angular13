import { Component, OnInit,  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { User, UserService } from '../../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

  currentUser?: User;

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.cd.markForCheck();
      }
    );
   }

}