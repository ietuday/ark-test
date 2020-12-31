import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  /**
   *
   * @param- snackBar
   * @param- zone
   */
  constructor(private _snackBar: MatSnackBar) { }

  /**
   *
   * @param- errorText
   */
  public activate(message: string): void {
    this._snackBar.open(message, 'Ok', {
      duration: 4000,
    });
  }
}
