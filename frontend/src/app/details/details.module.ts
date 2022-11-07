import { NgModule } from '@angular/core';

import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';

import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CarouselModule} from 'primeng/carousel';

@NgModule({
  imports: [
    DetailsRoutingModule,
    SharedModule, 
    FontAwesomeModule,
    CarouselModule
    ],
  declarations: [
    DetailsComponent
    ],
  providers: [],
})
export class DetailsModule {}