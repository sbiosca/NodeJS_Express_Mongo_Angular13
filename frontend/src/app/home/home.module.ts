import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
//import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    imports: [
        HomeRoutingModule,
        //SharedModule
    ],
    declarations: [
        HomeComponent
    ]
})export class HomeModule {}