import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MesasControllerService {

  private ApiUrlDevelopment = 'http://localhost:5000/api/MesasJob/'

  constructor(private http: HttpClient ) { }

  saveDataMesas(content) {
    return this.http.post(this.ApiUrlDevelopment + 'DataMesas', content);
  }

  updateMesas(id, content) {
    return this.http.put(this.ApiUrlDevelopment + 'MesaUpdate/' + id, content);
  }

  getMesas(id) {
    return this.http.get(this.ApiUrlDevelopment + 'GetMesas/' + id);
  }

  getMesasGen() {
    return this.http.get('http://localhost:5000/api/MesasJob/GetMesasGen');
  }

}
