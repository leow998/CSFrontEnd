import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PostingService } from 'src/app/services/posting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: any = [];
  validateForm!: FormGroup;

  constructor(private postingService: PostingService,
    private notification: NzNotificationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.getAllItems();
  }

  getAllItems() {
    this.items = [];
    this.postingService.getAllItems().subscribe((res) => {
      res.data.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.items.push(element);
      });
      // this.cars=res.data
      console.log(res);
    });
  }

}

