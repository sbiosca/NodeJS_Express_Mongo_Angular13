import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  //errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private FormBuilde: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    //use FormBuilder to create a form group
    this.authForm = this.FormBuilde.group({
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'password2': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.ActivatedRoute.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'SIGN IN' : 'SIGN UP';
    
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        //this.authForm.addControl('username', new FormControl());
      }
      this.cd.markForCheck();
    });
    console.log("auth-component")

  }

  submitForm() {
    console.log(this.authForm.value)
    // this.isSubmitting = true;
    // //this.errors = {errors: {}};

    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe({});
}
}
