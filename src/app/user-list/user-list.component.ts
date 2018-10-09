import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user';
import { ModalComponent } from '../modal/modal.component';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public data: any;

  constructor(private userService: UserService, private modalService: NgbModal, private alertService: AlertService) {
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

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      data => {
        this.alertService.success('Deleted user successful', true);
      },
      error => {
        this.alertService.error(error.error.message);
      }
    );
  }

  open(user: User) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.user = user;
  }

  openRegisterModal() {
    const modalRef = this.modalService.open(ModalRegisterComponent);
  }
}
