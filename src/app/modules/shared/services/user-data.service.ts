import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../resources/models/user';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private users: User[] = [];
  private id = 2;

  constructor() {
    const user = new User('angelia', 'angelika@gmail.com', 'angelika');
    user.id = 1;
    this.users.push(user);
  }

  public register(user: User): Observable<User> {
    const newUser = new User(user.userName, user.email, user.password);
    newUser.id = this.id;
    this.users.push(newUser);
    this.id++;
    return of(user).pipe(delay(1000));
  }

  public login(email: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.email === email);
    const token = Math.random()
      .toString(36)
      .substring(7);
    user.token = token;

    if (user.password === password) {
      localStorage.setItem('token', JSON.stringify(token));
      return of(true).pipe(delay(2000));
    }
    return of(false).pipe(delay(2000));
  }

  public getUserByToken(): Observable<User | never> {
    const token = localStorage.getItem('token');
    const user = this.users.find(item => {
      return item.token === JSON.parse(token);
    });

    return of(!user ? null : user).pipe(delay(1000));
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const user = this.users.find(item => {
      return item.token === JSON.parse(token);
    });
    return user ? true : false;
  }

  public getAllUsers(): User[] {
    return this.users;
  }
}
