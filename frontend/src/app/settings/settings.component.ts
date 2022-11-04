import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from '../core';
import { Errors } from '../core/models/error.model'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm: FormGroup;
  errors!: string;
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private ToastrService: ToastrService
    //private cd: ChangeDetectorRef
  ) {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    });
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    Object.assign(this.user, this.userService.getCurrentUser());
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    this.updateUser(this.settingsForm.value);
    this.userService
    .update(this.user)
    .subscribe({
      next: (data) => {
        console.log(data)
        this.isSubmitting = true;
        this.ToastrService.success("Settings!", "Updated your profile properly")
        this.router.navigateByUrl('/profile/' + data.username)
      },
      error: (error) => {
        console.log(error)
        this.isSubmitting = false;
        this.ToastrService.error("Settings!", "Username or email exists")
        this.errors = "Email or username aren't available";
      }
    });
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
