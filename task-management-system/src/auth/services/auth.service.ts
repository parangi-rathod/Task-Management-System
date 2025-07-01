import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, RegisterRequest, LoginResponse, LoginRequest, } from '../models/user.model';
import { SimpleResponse } from '../models/baseResponse.model';
import { backendUrl } from '../../environments/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7000/api'; // Update with your .NET API URL
  private currentUser: User | null = null;

  private readonly http = inject(HttpClient);

  // Modified registration method returning SimpleResponse
  public registerUser(registerData: RegisterRequest): SimpleResponse {
    let result: SimpleResponse = { success: false, message: '' };
    this.http.post<SimpleResponse>(`${backendUrl}/auth/register`, registerData)
      .subscribe({
        next: (response) => {
          result = response;
        },
        error: (error) => {
          result = { success: false, message: error.message || 'Registration failed' };
        }
      });
    return result;
  }
  // Simple login method with API call
  public loginUser(loginData: LoginRequest): void {
    // Make HTTP POST request to .NET API
    this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginData)
      .subscribe({
        next: (response) => {
          if (response.success && response.user) {
            this.currentUser = response.user;
          }
          console.log('Login response:', response);
        },
        error: (error) => {
          console.error('Login error:', error);
        }
      });
  }

  // Get all users from API
  getAllUsers(): void {
    this.http.get<SimpleResponse>(`${this.apiUrl}/users`)
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            console.log('Users fetched:', response.data);
          }
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
  }

  // Check if email exists via API
  checkEmailExists(email: string): void {
    this.http.get<SimpleResponse>(`${this.apiUrl}/auth/check-email/${email}`)
      .subscribe({
        next: (response) => {
          console.log('Email check result:', response);
        },
        error: (error) => {
          console.error('Error checking email:', error);
        }
      });
  }

  // Get user by ID from API
  getUserById(id: number): void {
    this.http.get<SimpleResponse>(`${this.apiUrl}/users/${id}`)
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            console.log('User fetched:', response.data);
          }
        },
        error: (error) => {
          console.error('Error fetching user:', error);
        }
      });
  }

  // Update user profile via API
  updateUserProfile(updatedUser: User): void {
    this.http.put<SimpleResponse>(`${this.apiUrl}/users/${updatedUser.id}`, updatedUser)
      .subscribe({
        next: (response) => {
          if (response.success) {
            // Update current user if it's the same user
            if (this.currentUser?.id === updatedUser.id) {
              this.currentUser = updatedUser;
            }
            console.log('Profile updated:', response);
          }
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });
  }

  // Delete user via API
  deleteUser(id: number): void {
    this.http.delete<SimpleResponse>(`${this.apiUrl}/users/${id}`)
      .subscribe({
        next: (response) => {
          console.log('User deleted:', response);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
  }

  // Basic getter methods
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  clearCurrentUser(): void {
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.roleId === 1;
  }

  isUser(): boolean {
    return this.currentUser?.roleId === 2;
  }

  // Simple logout method
  logout(): void {
    this.currentUser = null;
    // Call logout API
    this.http.post<SimpleResponse>(`${this.apiUrl}/auth/logout`, {})
      .subscribe({
        next: (response) => {
          console.log('Logout response:', response);
        },
        error: (error) => {
          console.error('Logout error:', error);
        }
      });
  }

  // Helper method to get current user's full name
  getCurrentUserFullName(): string {
    if (this.currentUser) {
      return `${this.currentUser.firstname} ${this.currentUser.lastname}`;
    }
    return '';
  }

  // Helper method to get current user's role name
  getCurrentUserRole(): string {
    return this.currentUser?.roleName || '';
  }

  // Method to change user password
  changePassword(oldPassword: string, newPassword: string): void {
    if (this.currentUser) {
      const changePasswordData = {
        userId: this.currentUser.id,
        oldPassword: oldPassword,
        newPassword: newPassword
      };

      this.http.post<SimpleResponse>(`${this.apiUrl}/auth/change-password`, changePasswordData)
        .subscribe({
          next: (response) => {
            console.log('Password change response:', response);
          },
          error: (error) => {
            console.error('Password change error:', error);
          }
        });
    }
  }
}
