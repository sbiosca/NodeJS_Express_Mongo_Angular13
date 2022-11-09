import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
//import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileComponent } from './profile.component';
//import { ProfileFavoritesComponent } from './profile-favorites.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
   // ProfileArticlesComponent,
    ProfileComponent,
    //ProfileFavoritesComponent
  ],
  providers: [
  ]
})
export class ProfileModule {}