import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  getLoggedInUser() {
    const user = localStorage.getItem("loggedInUser");
    return user ? JSON.parse(user) : null;
  }
  getUserRole(): string {
    const user = this.getLoggedInUser();
    return user?.role || "";
  }
  isAdmin(): boolean {
    return this.getUserRole() === "admin";
  }
  logout() {
    localStorage.removeItem("loggedInUser");
  }
}
