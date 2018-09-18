import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  model: any = {};

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.authenticationService.getUsername()).subscribe(
      restItems => {
        this.model = restItems;
      }
    );
  }

  update() {
    this.userService.update(this.model).subscribe(
      data => {
        this.alertService.success('Updated successful', true);
      },
      error => {
        console.log(error);
        this.alertService.error(error.error.message);
      });
  }
}
