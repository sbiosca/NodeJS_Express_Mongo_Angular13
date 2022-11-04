import { Component, OnInit,  ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Errors } from '../core/models/error.model'
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  authForm: FormGroup;
  isSubmitting = false;
  error2!: string;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private FormBuilde: FormBuilder,
    private cd: ChangeDetectorRef,
    private ToastrService: ToastrService
  ) {
    //use FormBuilder to create a form group
    this.authForm = this.FormBuilde.group({
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'password2': ['', Validators.required],
      'image': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.ActivatedRoute.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'SIGN IN' : 'SIGN UP';
    
      if (this.authType === 'register') {
        //this.authForm.addControl('username', new FormControl());
      }
      this.cd.markForCheck();
    });
  }

  submitForm() {
    this.isSubmitting = true;
    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe({
      next: (data) => {
        if (this.title === "SIGN IN") {
          this.ToastrService.success("Welcome!", "Login succesfully")
        }
        if (this.title === "SIGN UP") {
          this.ToastrService.success("Welcome!", "Register succesfully")
        }
        this.isSubmitting = true;
        this.router.navigateByUrl('/')
        console.log(data);
      },
      error: (error) => {
        console.log(error.errors);
        if (!error.errors) {
          this.error2 = "Email or username aren't available";
        }else {
          this.errors = error;
        }
        this.ToastrService.error("Auth!", "Error in Form Login or Register")
        this.isSubmitting = false;
        
      }
    })
}
}
