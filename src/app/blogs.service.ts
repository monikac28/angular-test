import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor( private http:HttpClient) { }

getBlogList():Observable<any>{
  return  this.http.get('https://docully.com/docully/public/api/blogs ').pipe(map((res: any) =>{
    return res;
  },
  catchError((err: any)=>{
    return throwError(err);
  })))
}


getCustomBlog(){
  return this.http.get('assets/client-blog.json')
}

getDetailBlog(){
  return this.http.get('https://docully.com/docully/public/api/view/30/test-test/blogs').pipe(map((res: any)=>{
    return res;
  },
  catchError((err: any)=>{
    return throwError(err);
  })
  ))
}

}
