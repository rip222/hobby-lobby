import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { UploadMetadata } from '@angular/fire/storage/interfaces';

@Component({
  selector: 'photo-upload',
  templateUrl: './photo-upload.component.html',
  styles: []
})
export class PhotoUploadComponent implements OnInit {
  @Input() file: File;
  @Output() urlsEmitted = new EventEmitter<{photo: string, photoPreview: string}>();
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // downloadUrl: string;
  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
    this.onUpload();
  }

  onUpload() {
    if (this.file) {
      const photoPath = `${Date.now()}_${this.file.name}`;
      const photoPreviewPath = `thumb@300_${photoPath}`;
      const photoPreviewRef = this.storage.ref(photoPreviewPath);
      const photoRef = this.storage.ref(photoPath);
      const metadata: UploadMetadata = {
        cacheControl: 'public,max-age=31556952000'
      };
      this.task = photoRef.put(this.file, metadata);
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges().pipe(
        tap(console.log),
        finalize( async () => {
          await photoRef.updateMetadata(metadata).toPromise();
          await photoPreviewRef.updateMetadata(metadata).toPromise();
          const photo = await photoRef.getDownloadURL().toPromise();
          const photoPreview = await photoPreviewRef.getDownloadURL().toPromise();

          this.urlsEmitted.emit({photo, photoPreview});
        })
      );
    }
  }

  isActive(snapshot) {
    return snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
