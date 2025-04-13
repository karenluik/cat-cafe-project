import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private apiUrl = 'http://localhost:3000/packages';

  constructor(private http: HttpClient) {}

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiUrl);
  }

  getPackage(id: number): Observable<Package> {
    return this.http.get<Package>(`${this.apiUrl}/${id}`);
  }
}
