import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-modal-results',
  templateUrl: './modal-results.component.html',
  styleUrls: ['./modal-results.component.css']
})
export class ModalResultsComponent implements OnInit {

  private courseName: string;
  uploadedFile: File;

  constructor(public activeModal: NgbActiveModal, private itemService: ItemService) {
  }

  ngOnInit() {
  }


  fileChange(e) {
    this.uploadedFile = e.srcElement.files[0];
  }

  sendResultsToServer() {
    if (this.uploadedFile != null) {
      this.itemService.sendResultsInPdf(this.courseName, this.uploadedFile).subscribe();
    }
    this.activeModal.close();
  }
}
