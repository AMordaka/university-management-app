import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  model: any = {};
  updateForm: FormGroup;

  constructor(private userService: UserService, private authenticationService: AuthenticationService,private formBuilder: FormBuilder){
  }

  ngOnInit() {
    this.getUser();
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      street: ['', Validators.required],
      numberStreet: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  getUser() {
  	this.userService.getUser(this.authenticationService.getUsername()).subscribe(
	      restItems => {
	        this.model = restItems;
	      }
	    );
  }

	update(){
		console.log(this.model);
	}
}
