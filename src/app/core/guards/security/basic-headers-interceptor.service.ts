import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import moment from "moment";
import {AuthService} from "../../auth/service/auth/auth.service";



@Injectable({
  providedIn: "root"
})
export class BasicHeadersInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addHeaders(request));
  }

  private addHeaders(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        "Current-Timezone": `${moment(new Date()).format("Z")}`,
        "Current-Version": `1.0.0`,
        "User-Agent-Name": `SGMEA`,
      }
    });
  }
}

export const BasicHeadersInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BasicHeadersInterceptor,
  multi: true
};

