import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../services/item.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-modal-picker',
  templateUrl: './modal-picker.component.html',
  styleUrls: ['./modal-picker.component.css']
})
export class ModalPickerComponent implements OnInit {

  public data: any;
  private assigned: Array<string> = new Array();
  private courseName: string;

  constructor(private modalService: NgbModal, private userService: UserService, public activeModal: NgbActiveModal, private itemService: ItemService, private alertService: AlertService) { }

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

  assign(event, user: string) {
    if ( event.target.checked ) {
        this.assigned.push(user);
    } else {
	    this.assigned.forEach( (item, index) => {
	     if(item === user) this.assigned.splice(index,1);
	   });
	}
  }

  onSubmit(){
	  if(this.assigned.length > 0){
	  	this.itemService.assignStudentsToCourse(this.courseName, this.assigned);
	  } else {
      this.activeModal.close()
	  	this.alertService.error('Unchecked Students!');
	  }
  }
}
