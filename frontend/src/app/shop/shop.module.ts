import { NgModule } from '@angular/core';

import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
    imports : [
        ShopRoutingModule
    ],
    declarations: [
        ShopComponent
    ]
})export class ShopModule {}
