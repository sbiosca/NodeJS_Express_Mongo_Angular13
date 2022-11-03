import { NgModule } from '@angular/core';

import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule {}
