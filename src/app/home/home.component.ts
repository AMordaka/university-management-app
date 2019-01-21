import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  public isDataLoaded$ = new BehaviorSubject<boolean>(false);
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2', '3', '3.5', '4', '4.5', '5'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[];
  isTeacher = false;
  isAdmin = false;

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authenticationService.isLoggedIn();
    this.authenticationService.isAdminIn().subscribe(value => this.isAdmin = value);
    this.authenticationService.isTeacherIn().subscribe(value => this.isTeacher = value);
    if (this.isAdmin === false) {
      if (this.isTeacher === false) {
        this.userService.getStudentItemsGrades(this.authenticationService.getUsername()).subscribe(
          restItems => {
            this.barChartData = [
              {data: restItems, label: 'Liczba ocen'}
            ];
            this.isDataLoaded$.next(true);
          }
        );
      } else {
        this.userService.getTeacherItemsGrades(this.authenticationService.getUsername()).subscribe(
          restItems => {
            this.barChartData = [
              {data: restItems, label: 'Liczba ocen'}
            ];
            this.isDataLoaded$.next(true);
          }
        );
      }
    }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
