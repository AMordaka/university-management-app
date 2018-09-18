import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  editForm: FormGroup;
  loading = false;
  submitted = false;

  @Input() user: User;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required]
    });
  }


  onSubmit() {
    this.submitted = true;
    console.log(this.editForm.value);
    this.loading = true;
    /*    this.userService.register(this.editForm.value)
          .pipe(first())
          .subscribe(
            data => {
              this.alertService.success('Updated successful', true);
            },
            error => {
              console.log(error);
              this.alertService.error(error.error.message);
              this.loading = false;
            });*/
  }


}
