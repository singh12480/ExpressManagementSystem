import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { authenticateService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  constructor(private authenticateService: authenticateService) { }

  ngOnInit() {
    this.form = new FormGroup({
      username : new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      password : new FormControl(null,{validators:[Validators.required]})     
    });
  }

  onLogin(){
    if(this.form.invalid) { return }  
    console.log("inside login...")
    console.log(this.form.value);  
    this.authenticateService.login(this.form.value.username,this.form.value.password);
       
  }

}
