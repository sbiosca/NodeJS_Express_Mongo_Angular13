import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        //{ provide: HTTP_INTERCEPTORS,useClass: HttpTokenInterceptor, multi: true }
    ]
})export class CoreModule {}