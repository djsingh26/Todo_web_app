import { BasicAuthenticationService } from './../service/basic-authentication.service';
import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username= 'djrocks'
  password='pass'

  errorMessage = 'Login Failed !! Please '
  invalidLogin = false

  constructor(private router:Router,
    private HardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService) { }
    
  ngOnInit(): void {
  }

  onClick(){
    console.log(this.username);
    // console.log(this.password);

   // if(this.username==="dj" && this.password===""){
    if(this.HardcodedAuthenticationService.authenticate(this.username, this.password)){ 
      //welcome
      this.router.navigate(['welcome',this.username])
      this.invalidLogin = false;
    } else{
      this.invalidLogin = true;
    }

  }

  // handleBasicAuthLogin(){
  //   this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
  //   .subscribe(
  //       data => {
  //         console.log(data)
  //         this.router.navigate(['welcome',this.username])
  //         this.invalidLogin = false;
  //       }
  //       ,error => {
  //         console.log(error)
  //         this.invalidLogin = true;
  //       }
  //   )
  // }

  handleJWTAuthLogin(){
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
    .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['welcome',this.username])
          this.invalidLogin = false;
        }
        ,error => {
          console.log(error)
          this.invalidLogin = true;
        }
    )
  }
  

}
