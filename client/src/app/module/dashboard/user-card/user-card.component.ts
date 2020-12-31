import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: UserModel;
  @Output() onChange = new EventEmitter();

  constructor(private apiService: ApiService,
    private toastService: ToastService,
    private dialog: MatDialog) { }

  /**
   * @function delete
   * @description To delete a user
   */
  delete() {
    let data = {
      id: this.user._id
    }
    this.apiService.request('DELETE_USER', { data }).subscribe((res) => {
      if (res) {
        this.toastService.activate('Deleted!');
        this.onChange.emit();
      } else {
        this.toastService.activate(res.message);
      }
    })
  }

  /**
   * @function edit
   * @description Open modal in edit mode
   */
  edit() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: "550px",
      height: "525px",
      data: {
        user: this.user
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.onChange.emit();
    });
  }
}
