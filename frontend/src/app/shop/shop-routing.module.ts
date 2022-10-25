import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';

const routes: Routes = [
    {
        path: 'category/-1',
        component: ShopComponent,
        resolve: {},
    },
    {
        path: 'category/:id',
        component: ShopComponent,
        resolve: {}
    },
    {
        path: ':filters',
        component: ShopComponent,
        resolve: {}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule {}