import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ItemService } from '../services/item.service';

import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.css']
})
export class ModalItemComponent implements OnInit {

  courseForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private alertService: AlertService, private authenticationService: AuthenticationService, private itemService: ItemService) { }

  ngOnInit() {
   this.courseForm = this.formBuilder.group({
      courseName: ['', Validators.required]
    });
  }

  get f() {
    return this.courseForm.controls;
  }

  onSubmit(){
  this.submitted = true;
    if (this.courseForm.invalid) {
      return;
    }
    this.itemService.createCourse(this.authenticationService.getUsername(), this.courseForm.value.courseName).subscribe(
    data => {
      this.alertService.success('Dodano przedmiot pomyślnie', true);
    },
    error => {
      console.log(error);
      this.alertService.error(error.error.message);
    });
    this.activeModal.close();
  }
}
