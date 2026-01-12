import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {

  private API_URL = 'http://localhost:8000/upload';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const form = new FormData();
    form.append('file', file);

    // Mientras no haya backend real:
    // return of({ ok: true, filename: file.name });

    return this.http.post(this.API_URL, form);
  }
}
