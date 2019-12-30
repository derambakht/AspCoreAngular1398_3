import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { User } from "src/app/models/accessRight/User";
import { UserService } from "src/app/services/accessRight/user.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  fileData: File = null;
  previewUrl: any = require("src/assets/images/user-photo.jpg");
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  user: User = new User();
  isUploading: boolean = false;
  // @ViewChild('fileInput', {static: false}) fileInput:ElementRef;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.previewUrl = reader.result;
    };
  }

  files: File[] = [];
  filePreviews : string[] = [];

  customPreview(file:File) {
    // Show preview
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = _event => {
      this.filePreviews.push(reader.result.toString());
    };
  }
 
onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);
  this.customPreview(event.addedFiles[0]);

}
 
onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
  this.filePreviews.splice(this.files.indexOf(event), 1);
  
}

  onSubmit() {
    this.isUploading = true;
    const formData = new FormData();
    formData.append("thumbnailFile", this.fileData);
    formData.append("userName", this.user.userName);
    formData.append("password", this.user.password);

    this.fileUploadProgress = "0%";

    try {
      this.userService.add(formData).subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress =
            Math.round((events.loaded / events.total) * 100) + "%";
          console.log(this.fileUploadProgress);
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = "";
          alert("کاربر جدید ثبت شد !!");
          this.router.navigate(["/users"]);
        }
      });
    } catch {
      this.isUploading = false;
      alert('خطا در ثبت داده');
    }
  }
}
