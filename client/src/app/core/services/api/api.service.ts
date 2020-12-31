import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ExceptionService } from './../exception/exception.service';
import { LoadingService } from './../loading/loading.service';
import { EndpointService, IApiEndpoint } from './../../config';
import { Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';

export interface ApiParam {
  data?: object;
  queryParams?: object;
  pathParams?: object;
  // query: Object;
}


/**
 *
 */
export interface ApiResponse {
  statusCode: number;
  message: string;
  isSuccess: boolean;
  data: any;
}

/**
 *
 */
// interface ApiResult {
//     data;
//     paginator?: Paginator;
//     message: string;
// }

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   *
   * @param- http
   * @param- exceptionService
   * @param- appStorage
   * @param- endpointService
   * @param- loadingService
   */
  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private endpointService: EndpointService,
    private loadingService: LoadingService
  ) { }

  /**
   *
   * @param- name
   * @param- params
   */
  // request(name: string, params?: ApiParam): Observable<ApiResponse> {
  request(name: string, params?: ApiParam): Observable<any> {
    const endpoint = this.getEndpoint(name);
    const url = this.addPathParamsIfAny(endpoint.url, params);
    let method: string;
    if (endpoint.method) {
      method = endpoint.method;
    }
    const requestOptions = {
      headers: this.getHeaders(),
      // method: endpoint.method,
      body: params ? params.data : {},
      search: this.getQueryParams(params)
    };

    this.loadingService.show();
    return (
      this.http
        .request(method, url, requestOptions)
        .pipe(map(res => this.extractData<ApiResponse>(res)))
        // .pipe(map(res => this.extractData<any>(res)))
        .pipe(catchError(this.exceptionService.catchBadResponse))
        .pipe(finalize(() => this.loadingService.hide()))
    );
  }

  /**
   *
   * @param- url
   * @param- data
   */
  private addPathParamsIfAny(url: string, data: ApiParam): string {
    if (data && data.pathParams) {
      for (const key in data.pathParams) {
        if (data.pathParams.hasOwnProperty(key)) {
          url = url.replace(key, data.pathParams[key]);
        }
      }
    }
    return url;
  }

  /**
   *
   * @param- params
   */
  private getQueryParams(params: ApiParam): HttpParams {
    const queryParam = new HttpParams();

    if (params && params.queryParams) {
      for (const key in params.queryParams) {
        if (params.queryParams.hasOwnProperty(key)) {
          const value = params.queryParams[key];
          queryParam.append(key, value);
        }
      }
    }
    return queryParam;
  }

  /**
   *
   * @param- name
   */
  private getEndpoint(name: string): IApiEndpoint {
    const endpoint = this.endpointService.get(name);

    if (!endpoint) {
      throw new Error('No endpoint is registered with' + name);
    }
    return endpoint;
  }

  /**
   *
   */
  private getHeaders(): HttpHeaders {
    let requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });
   
    return requestHeaders;
  }
  /**
   *
   * @param- res
   */
  private extractData<R>(res) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    const body = res ? res : null;

    // if (!body.success)
    //     throw new Error('Request was not successfull with an Error ->: ' + body.result.message);

    return (body || {}) as R;
  }
}
