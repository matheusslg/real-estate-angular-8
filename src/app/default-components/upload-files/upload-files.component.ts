import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  uploadUrl
  @Input() type
  @Input() typeAllowed
  @Input() maxFileSize

  public uploader: FileUploader;
  public hasAnotherDropZoneOver: boolean = false;
  public invalidFormat: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.type) {
      if (this.type == 'image') {
        this.uploadUrl = environment.baseUri.uploadImage;
      }
    } else {
      this.uploadUrl = environment.baseUri.uploadFile;
    }
    this.uploader = new FileUploader({
      url: this.uploadUrl,
      allowedMimeType: !this.typeAllowed ? ['image/png', 'image/jpg', 'image/jpeg'] : this.typeAllowed,
      maxFileSize: !this.maxFileSize ? 5 * 1024 * 1024 : this.maxFileSize
    });
  }

  public fileOver(e: any): void {
    this.hasAnotherDropZoneOver = e;
    console.log(this.uploader);
  }

}
