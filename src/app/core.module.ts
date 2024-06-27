import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RequestInterceptor } from "./Shared/Interceptors/request.interceptor";


@NgModule({
    providers:[
        {
            provide:HTTP_INTERCEPTORS,
            useClass:RequestInterceptor,
            multi:true
        }
    ]
})

export class CoreModule{}