import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/admin/services/auth.service';
import { Subject } from 'rxjs';

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
  @Input() blockDelete
  @Input() callUpload: Subject<boolean>
  @Output() uploadResData = new EventEmitter<any>();

  public uploader: FileUploader;
  public hasAnotherDropZoneOver: boolean = false;
  public invalidFormat: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.callUpload.subscribe((call: any) => {
      if (call) {
        this.uploader.uploadAll();
      }
    });
    if (this.type) {
      if (this.type == 'image') {
        this.uploadUrl = environment.baseUri.uploadImage;
      }
    } else {
      this.uploadUrl = environment.baseUri.uploadFile;
    }
    this.startUploader();
  }

  public fileOver(e: any): void {
    this.hasAnotherDropZoneOver = e;
    console.log(this.uploader);
  }

  startUploader() {
    this.uploader = new FileUploader({
      url: this.uploadUrl,
      authToken: 'Bearer ' + this.authService.getToken(),
      allowedMimeType: !this.typeAllowed ? ['image/png', 'image/jpg', 'image/jpeg'] : this.typeAllowed,
      maxFileSize: !this.maxFileSize ? 5 * 1024 * 1024 : this.maxFileSize
    });
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response);
    this.uploadResData.emit(data);
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let error = JSON.parse(response);
    this.uploadResData.emit(error);
  }

}
