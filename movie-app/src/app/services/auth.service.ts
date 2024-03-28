import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor() {}

  login(username: string, password: string): boolean {
    if (username === 'notJurgis' && password === 'notJurgis') {
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
