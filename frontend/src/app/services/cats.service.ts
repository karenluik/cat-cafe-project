import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Cats} from "../common/interfaces";
import {environment} from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class CatsService {
private readonly http : HttpClient = inject(HttpClient);
  constructor() { }

  getCats() : Observable<Cats[]>{
    return this.http.get<Cats[]>(environment.baseUrl+'cats');
  }
}
