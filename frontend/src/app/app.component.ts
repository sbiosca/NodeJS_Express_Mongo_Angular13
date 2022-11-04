import { Component, OnInit } from '@angular/core';
import { User, UserService } from './core';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  constructor(
    private userService: UserService
  ) { }
  
  ngOnInit(): void {
    this.userService.populate();
  }
}

