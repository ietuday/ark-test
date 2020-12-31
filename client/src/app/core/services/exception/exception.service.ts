import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

/**
 * @"class" ExceptionService
 * @description Handles all types of exceptions in the application.
 */
@Injectable({
  providedIn: 'root'
})
export class ExceptionService {

  /**
   *
   * @param- toastService
   * @param- router
   * @param- appStorage
   */
  constructor(
    // private snackBar: MdSnackBar,
    private toastService: ToastService,
    private router: Router) { }

  /**
   * @method log
   * @param- error
   * @description logs the error to the console.
   */
  log(error: string): void {
    console.log(error);
  }

  /**
   * @method catchBadResponse
   * @param- error
   * @description logs the error to the console.
   */
  catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
    const res = errorResponse;
    const err = res;
    const emsg = err ?
      (err.error.message ? err.error.message : JSON.stringify(err.message)) :
      (res.statusText || 'unknown error');

    this.handleStatusCode(res.status);
    this.toastService.activate(`Error- ${emsg}`);
    return throwError(err); // TODO: We should NOT swallow error here.
  }

  /**
   *
   * @param- statusCode
   */
  private handleStatusCode(statusCode: number): void {

    switch (statusCode) {
      case 401 :
        this.router.navigate(['/']);
        break;
    case 0 :
        this.router.navigate(['/']);
        break;
    }

  }
}
