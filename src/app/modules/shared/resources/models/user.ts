export class User {
  id: number;
  userName: string;
  email: string;
  password: string;
  token?: string;

  constructor(userName, email, password) {
    this.userName = userName;
    this.email = email;
    this.password = password;
  }
}
