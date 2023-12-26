import { Injectable } from '@angular/core';
import { MainServiceService } from './main-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquimentService extends MainServiceService {
  constructor(
    http:HttpClient
  ) { 

    //super("https://localhost:44327/api/equmentonemachine",http);
    super("http://ylasms02.yulon-motor.com.tw:83/api/equmentonemachine/",http);
    

  }
}
