import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core';
import { ProfileResolver } from './profile-resolver.service';
import { ProfileComponent } from './profile.component';


const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      //profile: ProfileResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':username/:products',
    component: ProfileComponent,
    resolve: {
      //profile: ProfileResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':username/current_user',
    component: ProfileComponent,
    resolve: {
      //profile: ProfileResolver
    },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
