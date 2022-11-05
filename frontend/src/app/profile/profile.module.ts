import { NgModule } from '@angular/core';

//import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileComponent } from './profile.component';
//import { ProfileFavoritesComponent } from './profile-favorites.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
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