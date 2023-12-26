import { Injectable } from '@angular/core';
import { MainServiceService } from './main-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PickitemService extends MainServiceService {

  constructor(
    http:HttpClient
  ) { 

    //super("https://localhost:44383//api//Pick/",http);
    super("http://ylasms02.yulon-motor.com.tw:81/api//Pick/",http);
    

  }
}
