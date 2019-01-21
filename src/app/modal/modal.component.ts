import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../models/user';
import {AlertService} from '../services/alert.service';
import {UserService} from '../services/user.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  loading = false;
  submitted = false;

  @Input() user: User;

  constructor(public activeModal: NgbActiveModal, private alertService: AlertService, private userService: UserService, private translate: TranslateService) {
  }

  ngOnInit(): void {
  }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log(this.user);
    this.userService.update(this.user).subscribe(
      data => {
        this.alertService.success(this.translate.instant('APP.UPDATED_SUCCESS'), true);
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.alertService.error(error.error.message);
      });
    this.activeModal.close();
  }
}
