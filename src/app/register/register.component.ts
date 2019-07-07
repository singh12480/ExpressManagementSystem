import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { authenticateService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  matchStatus:boolean;
  Registerform:FormGroup;

  constructor(private authenticateService: authenticateService) { }

  ngOnInit() {
    this.Registerform = new FormGroup({
      firstName : new FormControl('',{validators:[Validators.minLength(3),Validators.required]}),
      lastName : new FormControl('',{validators:[Validators.minLength(3),Validators.required]}),
      email : new FormControl('',{validators:[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]}),
      password : new FormControl('',{validators:[Validators.required,Validators.minLength(6),
                    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]}),
      confirmPwd : new FormControl('',{validators:[Validators.required,
                    Validators.minLength(6),
                    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]})
    });
  }

  onSubmit(){
    console.log('submitting....')
    console.log(this.Registerform.get('password'));
    if(this.Registerform.invalid) { return console.log('not valid form'); }

    if(this.Registerform.value.password !== this.Registerform.value.confirmPwd){
      console.log('password not matched!!');
      // this.matchStatus = false;
      return false;
    } else{
      this.matchStatus = true;
      console.log("registering...")
      console.log(this.Registerform.value); 
      this.authenticateService.register(this.Registerform.value.firstName,this.Registerform.value.lastName,
        this.Registerform.value.email,this.Registerform.value.password);  
  }
}

}
