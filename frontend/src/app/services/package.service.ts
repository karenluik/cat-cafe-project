import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../common/interfaces';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) {}

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(environment.baseUrl+'packages');
  }

  getPackage(id: number): Observable<Package> {
    return this.http.get<Package>(environment.baseUrl+'packages/'+id);
  }
}
