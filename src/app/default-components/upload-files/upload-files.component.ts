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
  @Input() typeAllowed
  @Input() maxFileSize

  public uploader: FileUploader = new FileUploader({
    url: this.uploadUrl,
    allowedMimeType: !this.typeAllowed ? ['image/png', 'image/jpg', 'image/jpeg'] : this.typeAllowed,
    maxFileSize: !this.maxFileSize ? 5 * 1024 * 1024 : this.maxFileSize
  });
  public hasAnotherDropZoneOver: boolean = false;
  public invalidFormat: boolean = false;

  constructor() {
    this.uploadUrl = environment.baseUri.uploadFile;
  }

  ngOnInit() {
  }

  public fileOver(e: any): void {
    this.hasAnotherDropZoneOver = e;
    console.log(this.uploader);
  }

}
