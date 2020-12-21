import { API_URL } from './../app.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export const TOKEN ='token';
export const AUTHENTICATED_USER = 'authenticateuser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
      private http: HttpClient
  ) { }



  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

    
//   executeHelloWorldBeanService(){
//     return this.http.get<AuthenticationBean>('http://localhost:8080/basicauth'
//     ,{headers});
//     //console.log("Execute Hello World Bean Service")
//   }
  
  executeAuthenticationService(username, password){
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' +password)
    //return basicAuthHeaderString;

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`
    ,{headers}).pipe(
        map(
            data=> {
                sessionStorage.setItem(AUTHENTICATED_USER,username);
                sessionStorage.setItem(TOKEN,basicAuthHeaderString);
                return data;
            }
        )
    );
    //console.log("Execute Hello World Bean Service")
  }
 getAuthenticatedUser(){
   
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser()){
    return sessionStorage.getItem(TOKEN)}
  }

//   createBasicAuthenticationHttpHeader(){
//     let username = 'user'
//     let password = 'password'
//     let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' +password)
//     return basicAuthHeaderString;
//   }

}

export class AuthenticationBean{
    constructor(public message:string){}
}
