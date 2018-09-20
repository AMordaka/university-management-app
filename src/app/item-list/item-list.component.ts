import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from '../services/authentication.service';
import {ItemService} from '../services/item.service';
import {AlertService} from '../services/alert.service';
import {ModalItemComponent} from '../modal-item/modal-item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  public data: any;
  isTeacher = false;

  constructor(private userService: UserService, private modalService: NgbModal, private authenticationService: AuthenticationService, private itemService: ItemService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.authenticationService.isTeacherIn().subscribe(value => this.isTeacher = value);
    if (this.isTeacher === false) {
      this.getUserItems();
    } else {
      this.getTeacherItems();
    }

  }

  getUserItems() {
    this.userService.getStudentItems(this.authenticationService.getUsername()).subscribe(
      restItems => {
        this.data = restItems;
      }
    );
  }

  getTeacherItems() {
    this.userService.getTeacherItems(this.authenticationService.getUsername()).subscribe(
      restItems => {
        this.data = restItems;
      }
    );
  }

  openModalAddCourse() {
    const modalRef = this.modalService.open(ModalItemComponent);
  }
}
