import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${environment.API_URL}/products`);
  }
}
