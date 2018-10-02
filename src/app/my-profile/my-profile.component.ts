import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  model: any = {};
  imgsrc = 'https://c.staticblitz.com/assets/client/components/SideMenu/blitz_logo-11cebad97cad4b50bc955cf72f532d1b.png';

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private alertService: AlertService, public _d: DomSanitizer) {
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

  fileChange(e) {
    const file = e.srcElement.files[0];
    this.imgsrc = window.URL.createObjectURL(file);
  }
}
