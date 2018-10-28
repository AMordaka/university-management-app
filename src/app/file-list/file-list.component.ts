import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  data: any;

  constructor(private  itemService: ItemService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.itemService.getAllPdfs().subscribe(
      restItems => {
        this.data = restItems;
      }
    );
  }

  downloadFile(item) {
    this.itemService.getPdf(item.id).subscribe(restItems => {
      const blob = new Blob([restItems], {type: 'blob'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  deleteItem(item) {
    this.itemService.deleteItem(item.id).subscribe(
      data => {
        this.alertService.success('Deleted user successful', true);
        this.data = this.data.filter(h => h !== item);
      },
      error => {
        this.alertService.error(error.error.message);
      }
    );
  }
}
