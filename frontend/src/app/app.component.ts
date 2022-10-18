import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'Angular 13 CRUD example';

  constructor(private toastrService: ToastrService) { }
  
  public toastr_success(): void {
    this.toastrService.success("Message success!", "You can create a new product")
  }
  public toastr_allprod(): void {
    this.toastrService.success("Message success!", "This are the all products")
  }
}

