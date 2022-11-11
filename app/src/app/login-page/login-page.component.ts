import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  password: string = '';
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  onSubmit(data: any) {
    this.submitted = true;
    console.log(data.password);
    this.authenticationService
      .login(data.password)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(`data from subscriber: ${data}`);
          this.router.navigate(['/']);
        },
        (error) => {
          this.error = error.error.error;
          this.loading = false;
        }
      );
  }
}
