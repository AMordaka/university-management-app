import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public data: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getListUsers();
  }

  getListUsers() {
    this.userService.getAll().subscribe(
      restItems => {
        this.data = restItems;
      }
    );
  }

}
