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
 
  // public toastr_success(): void {
  //   this.toastrService.success("Message success!", "You can create a new product")
  // }
  // public toastr_allprod(): void {
  //   this.toastrService.success("Message success!", "This are the all products")
  // }
}

