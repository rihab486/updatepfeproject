import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Galery } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class GaleryService {
 
 
  constructor(private http: HttpClient) { }
  addGaleriesToImageColor(pr: Galery, idimagec: any) :Observable<Galery> {
    return this.http.post<Galery>(`http://localhost:8080/api/addGaleriesToImageColor/${idimagec}`,pr);
  }
  findGaleryForImageColor(idimagec: any) : Observable<Galery[]>{
    return this.http.get<Galery[]>(`http://localhost:8080/api/findGaleryForImageColor/${idimagec}`);
  }
  findallgalery(): Observable<Galery[]> {
    return this.http.get<Galery[]>(`http://localhost:8080/api/findAllGalery`);
  }
  
}
