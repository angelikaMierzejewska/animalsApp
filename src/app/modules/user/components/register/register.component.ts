import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from '../../../shared/services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private registerForm = this.formBuilder.group({
    userName: ['', Validators.required],
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
    private userDataServcie: UserDataService,
    private router: Router
  ) {}

  public ngOnInit(): void {}

  public submit() {
    this.isLoading = true;
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.userDataServcie.register(this.registerForm.value).subscribe(data => {
        this.isLoading = false;
        this.router.navigate(['login']);
      });
    }
  }
}
