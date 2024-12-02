import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(`${environment.API_URL}/products/categories`);
  }

  getByCategory(category: string) {
    return this.http.get(`${environment.API_URL}/products/category/${category}`);
  }
}
