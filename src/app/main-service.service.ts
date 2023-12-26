import { HttpClient, HttpErrorResponse, JsonpInterceptor } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { __values } from 'tslib';


// @Injectable({
//   providedIn: 'root'
// })

export class MainServiceService {
  public apiName="";
  constructor(
    private url:string,
    private http:HttpClient
  ) { 
  
  }
  
    // private url ="https://jsonplaceholder.typicode.com/posts";
    //封裝
    private handleError=
    (err:HttpErrorResponse)=>{
      let errorMessage:string;
      switch(err.status){
      case 400:
        errorMessage="參數錯誤";
        break;
      case 404:
        errorMessage="內容不存在";
        break;
      case 200:
        errorMessage="成功";
        break;
      default:
        errorMessage=`異常錯誤`;
        break;
      }
      return of({errMessage:errorMessage});
    }
  
    // getData(apiname:string,id:any){
    //   return this.http.get(`${this.url}/${apiname}/${id}`)
    //   .pipe(
    //       catchError(this.handleError),
    //       map(data => data)
    //       )
    //   }
  
    getData(apiname:string,id:any){
      return this.http.get(`${this.url}/${apiname}/${id}`)
      .pipe(
          catchError(this.handleError)
          );
      }
    
    getAllData(apiname:string){
      return this.http.get(`${this.url}/${apiname}`)
      .pipe(
          catchError(this.handleError)
          );
      }
  
      //promise
      // const promise =new Promise((resolve)=>{
      //   console.log("promise run");
  
      //   resolve('susscee');
      // })
      // .then();
  
  
    postData(apiname:string,data:any){
      //this.http.post("http://localhost:55386/login/login",{"userId":"123","userPwd":"123"})
      return this.http.post(`${this.url}/${apiname}`,data)
     .pipe(
      catchError(this.handleError),
      );
    }
    updateData(apiname:string,id:any,data:any){
      return this.http.patch(`${this.url}/${apiname}`,data)
      .pipe(
        catchError(this.handleError)
        );
    }
    deleteData(apiname:string,id:any){
      return this.http.delete(`${this.url}/${apiname}`)
     .pipe(
      catchError(this.handleError)
      );
    }
}
