import { Component, inject, Inject } from '@angular/core';
import { IUsers } from '../../model/iusers';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj:IUsers;
  http=inject(HttpClient);
  router = inject(Router);
  constructor(){
    this.loginObj={
      userName:"",
      password:""
    };

  }
  onLogin() {
    this.http.get<any[]>("http://localhost:3000/users").subscribe({
      next: (users) => {
        // Check if the entered username and password exist in the database
        const user = users.find(u => u.email === this.loginObj.userName && u.password === this.loginObj.password);

        if (user) {
          console.log("Login successful", user);

          // ✅ Store user data in localStorage (or sessionStorage)
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          alert("Login successful!");
          this.router.navigateByUrl("dashboard"); // Redirect to another page
        } else {
          alert("Invalid credentials. Please try again.");
        }
      },
      error: (error) => {
        console.error("Login failed", error);
        alert("Login failed. Please try again later.");
      }
    });
  }
}
