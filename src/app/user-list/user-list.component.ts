import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public data: any;

  constructor(private userService: UserService, private alertService: AlertService, private modalService: NgbModal) {
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

  open(user: User) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.user = user;
  }

}
