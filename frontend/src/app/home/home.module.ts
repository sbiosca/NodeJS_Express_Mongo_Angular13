import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        HomeRoutingModule,
        SharedModule,
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [
        HomeComponent
    ]
})export class HomeModule {}