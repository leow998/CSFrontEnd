import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PostingService } from 'src/app/services/posting.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {

  productId: any = this.activatedroute.snapshot.params['prouduct_id'];
  currentFileUpload: File;
  myFile: FileList;
  avatarUrl: any = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMEOb9DSnnU_mwSu5HYXuFuUjktAvKecyMrw&usqp=CAU';
  isSpinning = false;
  validateForm!: FormGroup;
  imgChanged = false;

  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private postingService: PostingService,
    private activatedroute: ActivatedRoute,) { }


  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getCarByCarId();
  }

  getCarByCarId() {
    console.log(this.productId)
    this.postingService.getItemById(this.productId).subscribe((res) => {
      console.log(res);
      const itemDto = res.data.itemDto;
      this.avatarUrl = 'data:image/jpeg;base64,' + res.data.itemDto.returnedImg;
      this.validateForm.patchValue(itemDto);
    })
  }

  submitForm(): void {
    console.log(this.validateForm.valid);
    console.log(this.validateForm);
    if (this.validateForm.valid) {
      console.log("In function");
      this.isSpinning = true;
      const formData: FormData = new FormData();
      if (this.imgChanged) {
        formData.append('img', this.currentFileUpload);
      }
      formData.append('email', this.validateForm.get('email').value);
      formData.append('name', this.validateForm.get('name').value);
      formData.append('phone', this.validateForm.get('phone').value);
      formData.append('title', this.validateForm.get('title').value);
      formData.append('description', this.validateForm.get('description').value);
      console.log(formData);
      this.postingService.updateItem(this.productId, formData).subscribe((res) => {
        this.isSpinning = false;
        if (res.status == "OK") {
          this.notification
            .success(
              'SUCCESS',
              `Item Updated Successfully!!!`,
              { nzDuration: 5000 }
            );
          this.router.navigateByUrl('');
        } else {
          this.notification
            .error(
              'ERROR',
              `${res.message}`,
              { nzDuration: 5000 }
            )
        }
      });
    } else {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  uploadProfileImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    this.currentFileUpload = file;
    alert('File is here : ' + this.currentFileUpload);

  }

  public uploadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.myFile = input.files;

    if (!input.files?.length) {
      return;
    }
    this.currentFileUpload = input.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.currentFileUpload);
    this.imgChanged = true;
    reader.onload = (_event) => {
      this.avatarUrl = reader.result;
    };
  }
}
