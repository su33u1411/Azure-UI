import {Component, OnInit} from '@angular/core';
import {AppService} from '../service/app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;

  constructor(private appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
    const token = this.appService.getToken();
    if (token) {
      this.username = JSON.parse(atob(token.split('.')[1])).sub;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
