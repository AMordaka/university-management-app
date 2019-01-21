import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {AlertService} from '../services/alert.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  model: any = {};
  imageToShow: Observable<string>;
  uploadedFile: File;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private alertService: AlertService, public translate: TranslateService) {
  }

  ngOnInit() {
    this.getUser();
    this.getAvatar();
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
        this.alertService.success(this.translate.instant('APP.UPDATED_SUCCESS'), true);
      },
      error => {
        this.alertService.error(error.error.message);
      });
  }

  fileChange(e) {
    this.uploadedFile = e.srcElement.files[0];
    this.updateAvatar();
  }

  updateAvatar() {
    this.userService.addAvatar(this.uploadedFile).subscribe();
    location.reload();
  }

  getAvatar() {
    this.userService.getAvatar().subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    if (image != null) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.imageToShow = reader.result;
      }, false);

      if (image) {
        reader.readAsDataURL(image);
      }
    }
  }
}
