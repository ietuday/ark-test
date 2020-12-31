import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup
  user: UserModel = null;
  dateChanged = false;

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    this.user = this.data ? this.data.user as UserModel : null;

    if (!this.user) {

      this.addUserForm = this.formBuilder.group({
        firstName: this.formBuilder.control(null, Validators.required),
        lastName: this.formBuilder.control(null, Validators.required),
        email: this.formBuilder.control(null, [Validators.required, Validators.email]),
        mobile: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^[789]\d{9}$/)])
      });
    } else {
      this.addUserForm = this.formBuilder.group({
        firstName: this.formBuilder.control(this.user.firstName, Validators.required),
        lastName: this.formBuilder.control(this.user.lastName, Validators.required),
        email: this.formBuilder.control(this.user.email, [Validators.required, Validators.email]),
        mobile: this.formBuilder.control(this.user.mobileNo, [Validators.required, Validators.pattern(/^[789]\d{9}$/)])
      });
    }

  }

  /**
   *@function saveOrUpdate
   * @description Make a decision whether update or add new
   */
  saveOrUpdate() {
    this.user ? this.update() : this.add();
  }

  /**
   * @function add
   * @description Create new entry for user
   */
  add() {
    let data = {
      firstName: this.addUserForm.value.firstName,
      lastName: this.addUserForm.value.lastName,
      email: this.addUserForm.value.email,
      mobileNo: this.addUserForm.value.mobile,
      type: 'user'
    }

    this.apiService.request('CREATE_USER', { data }).subscribe((result) => {
      if (result) {
        this.toastService.activate('Successfully!')
        this.dialogRef.close();
      }
    })
  }

  /**
   * @function update
   * @description Update existing employee
   */
  update() {
    let data = {
      id: this.user._id,
      firstName: this.addUserForm.value.firstName,
      lastName: this.addUserForm.value.lastName,
      email: this.addUserForm.value.email,
      mobileNo: this.addUserForm.value.mobile,
      type: 'user'
    }

    this.apiService.request('UPDATE_USER', { data }).subscribe((result) => {
      if (result) {
        this.toastService.activate('Successfully!')
        this.dialogRef.close();
      }
    })
  }

}
