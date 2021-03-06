import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { ModalGradeComponent } from '../modal-grade/modal-grade.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPickerComponent } from '../modal-picker/modal-picker.component';
import { ModalResultsComponent } from '../modal-results/modal-results.component';

@Component({
  selector: 'app-item-profile',
  templateUrl: './item-profile.component.html',
  styleUrls: ['./item-profile.component.css']
})
export class ItemProfileComponent implements OnInit {

  data: any;
  courseName: string;

  constructor(private route: ActivatedRoute, private itemService: ItemService, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.route.paramMap.subscribe(params => {
      this.courseName = params.get('courseName');
      this.itemService.getItems(params.get('username'), params.get('courseName')).subscribe(
        restItems => {
          this.data = restItems;
        }
      );
    });
  }

  openModalGrade(studentUsername: string, courseId: string) {
    const modalRef = this.modalService.open(ModalGradeComponent);
    modalRef.componentInstance.studentUsername = studentUsername;
    modalRef.componentInstance.courseId = courseId;
    modalRef.result.then((result) => {
      location.reload();
    }).catch(error => {
    });
  }

  openModalPicker(courseName: string) {
    const modalRef = this.modalService.open(ModalPickerComponent);
    modalRef.componentInstance.courseName = courseName;
    modalRef.result.then((result) => {
      location.reload();
    }).catch(error => {
    });
  }

  openModalInsertResults(courseName: string) {
    const modalRef = this.modalService.open(ModalResultsComponent);
    modalRef.componentInstance.courseName = courseName;
    modalRef.result.then((result) => {
      location.reload();
    }).catch(error => {
    });


  }
}
