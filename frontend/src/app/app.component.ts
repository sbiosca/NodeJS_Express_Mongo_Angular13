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
  
  user: boolean = false;
  ngOnInit(): void {
    // if (localStorage.getItem("Token")) {
    //   this.userService.isAuthenticated.subscribe(
    //     (isAuthenticated) => {
    //       this.user = isAuthenticated;
    //       console.log(this.user);
    //     }
    //   )
    // }else {
    //   console.log("NOT TOKEN")
    // }
    this.userService.populate();
  }
  // public toastr_success(): void {
  //   this.toastrService.success("Message success!", "You can create a new product")
  // }
  // public toastr_allprod(): void {
  //   this.toastrService.success("Message success!", "This are the all products")
  // }
}

