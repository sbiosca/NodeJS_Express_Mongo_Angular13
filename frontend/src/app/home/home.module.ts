import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CarouselModule} from 'primeng/carousel';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';



@NgModule({
    imports: [
        HomeRoutingModule,
        SharedModule,
        CommonModule,
        FontAwesomeModule,
        CarouselModule,
        InfiniteScrollModule
    ],
    declarations: [
        HomeComponent
    ]
})export class HomeModule {}