import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private uploadUrl = 'https://youva-com-server.onrender.com/upload';
  private imagesUrl = 'https://youva-com-server.onrender.com/images';

  constructor(private http: HttpClient) { }

  //UPLOAD THE IMAGES
  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(this.uploadUrl, formData);
  }

  //DISPLAY THE IMAGES
  getImages(): Observable<any[]> {
    return this.http.get<any[]>(this.imagesUrl);
  }
}
