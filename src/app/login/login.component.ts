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

  errorMessage = 'INVALID'
  invalidLogin = false

  constructor(private router:Router,
    private HardcodedAuthenticationService: HardcodedAuthenticationService) { }

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
  

}