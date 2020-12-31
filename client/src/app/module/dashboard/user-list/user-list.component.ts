import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  allUsers: UserModel[] = []
  constructor(
    private apiService: ApiService,
    public dialog: MatDialog) {
      console.log("Called");
      
     }

  ngOnInit() {
    this.getAllUsers()
  }

  /**
   * @function getAllUsers
   * @description Get all users from server
   */
  getAllUsers() {
    this.apiService.request('GET_ALL_USER').subscribe(result => {
      this.allUsers = [];
      this.allUsers = result as UserModel[];
    });
  }

  /**
   * @function addNewUser
   * @description Open add new user modal
   */
  addNewUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: "550px",
      height: "525px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });
  }

  /**
   * @function onChanges
   * @description Called when something changes in user
   */
  onChanges() {
    this.getAllUsers();
  }
}
