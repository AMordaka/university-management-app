import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.route.paramMap.subscribe(params => {
      this.userService.getUser(params.get('username')).subscribe(
        restItems => {
          this.user = restItems;
        }
      );
    });
  }
}
