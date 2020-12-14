import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuGetService {

  private ApiUrlDevelopment = 'http://localhost:5000/api/Menu/';


  constructor(private http: HttpClient) { }


  getMenuMasterClass() {
    return this.http.get(this.ApiUrlDevelopment + 'GetMenuClass');
  }

  getMenuSubClass(codigo) {
    return this.http.get(this.ApiUrlDevelopment + 'GetMenuSubClass/' + codigo);
  }
  
  getPedsGen() {
    return this.http.get(this.ApiUrlDevelopment + 'GetPedido');
  }
  
  postPedidos(content) {
    return this.http.post(this.ApiUrlDevelopment + 'PostPedido', content);
  }

}
