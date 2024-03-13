import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  urlBase() {
    const urlBase = 'http://127.0.0.1:8080/api';
    return urlBase;
  }

  sidebar(item: string) {
    document.getElementById(item)?.classList.add('active');
  }
}
