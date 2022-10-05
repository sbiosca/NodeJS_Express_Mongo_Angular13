import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
    imports : [
        ShopRoutingModule,
        SharedModule,
        CommonModule
    ],
    declarations: [
        ShopComponent
    ]
})export class ShopModule {}
