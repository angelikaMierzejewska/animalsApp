import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from '../../../shared/services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]
    ],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });
  private isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private router: Router
  ) {}

  public ngOnInit(): void {}

  public submit(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.isLoading = true;

      this.userDataService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(data => {
          if (data) {
            this.isLoading = false;
            this.router.navigate(['profile']);
          }
        });
    }
  }
}
