import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.modules';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/page/header/header.component';
import { FooterComponent } from './shared/page/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

//import { far } from '@fortawesome/free-regular-svg-icons';

import {CarouselModule} from 'primeng/carousel';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
    // AddProductComponent,
    // ProductDetailsComponent,
    // ProductsListComponent
  ],
  imports: [
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    CarouselModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    ToastrModule.forRoot({
      positionClass : 'toast-top-right',
      timeOut: 5000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas)
  }
}
