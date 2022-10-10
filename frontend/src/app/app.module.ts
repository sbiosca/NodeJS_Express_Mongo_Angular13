import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.modules';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/page/header/header.component';
import { FooterComponent } from './shared/page/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';

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
  
    BrowserAnimationsModule,
    BrowserModule,
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
    FontAwesomeModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
