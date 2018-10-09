import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  model: any = {};
  fileUpload: Observable<string>;
  uploadedFile: File;

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
        this.alertService.error(error.error.message);
      });
  }

  fileChange(e) {
    this.uploadedFile = e.srcElement.files[0];
  }

  updateAvatar() {
    this.userService.addAvatar(this.authenticationService.getUsername(), this.uploadedFile).subscribe();
  }

  getAvatar() {
    this.userService.getAvatar(this.authenticationService.getUsername()).subscribe();
  }
}
