import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {ItemService} from '../services/item.service';
import {CourseInfo} from '../models/courseInfo';

import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-modal-grade',
  templateUrl: './modal-grade.component.html',
  styleUrls: ['./modal-grade.component.css']
})
export class ModalGradeComponent implements OnInit {

  gradeForm: FormGroup;
  loading = false;
  submitted = false;

  @Input() studentUsername: string;
  course: CourseInfo = new CourseInfo();

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private alertService: AlertService, private authenticationService: AuthenticationService, private itemService: ItemService) {
  }

  ngOnInit() {
    this.gradeForm = this.formBuilder.group({
      grade: ['', Validators.required]
    });
    console.log(this.studentUsername);
  }

  get f() {
    return this.gradeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.gradeForm.invalid) {
      return;
    }

    this.course.grade = this.gradeForm.value.grade;
    this.course.studentUsername = this.studentUsername;
    this.course.teacherUsername = this.authenticationService.getUsername();
    this.itemService.putGrade(this.course).subscribe(
      data => {
        this.alertService.success('Puted grade successful', true);
      },
      error => {
        console.log(error);
        this.alertService.error(error.error.message);
      });

    this.activeModal.close();
  }

}
