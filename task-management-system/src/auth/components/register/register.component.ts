import { Component, ViewChild, OnInit, NgModule } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { User, RegisterRequest } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;

  // Component properties for data binding
  public defaultgender: string = 'male';
  public isLoading: boolean = false;
  public errorMessage: string = '';
  public successMessage: string = '';
  public userAlreadyExists: boolean = false;
  
  // Form data model
  public userData: User = {
    firstname: '',
    lastname: '',
    email: '',
    phone: 0,
    password: '',
    gender: 'female',
    roleId: 2 // Default to user role
  };

  // Gender options for dropdown
  public genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initRolesTable();
  }

  private initRolesTable(): void {
    const roles = localStorage.getItem('roles');
    if (!roles) {
      const defaultRoles = [
        { id: 1, name: 'admin', description: 'Administrator with full access' },
        { id: 2, name: 'user', description: 'Regular user with limited access' }
      ];
      localStorage.setItem('roles', JSON.stringify(defaultRoles));
    }
  }

  // Method to set sample values (for testing)
  public setValues(): void {
    this.userData = {
      firstname: 'Parangi',
      lastname: 'Rathod',
      email: 'parangirathod27@gmail.com',
      phone: 9726976891,
      password: '2527@Parangi',
      gender: 'female',
      roleId: 2
    };
  }

  // Submit form method - simplified without RxJS
  public submitForm(formData: NgForm): void {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';
    this.userAlreadyExists = false;

    if (formData.valid) {
      this.isLoading = true;

      // Prepare registration data
      const registerData: RegisterRequest = {
        firstName: this.userData.firstname,
        lastName: this.userData.lastname,
        email: this.userData.email,
        password: this.userData.password,
        roleId: this.userData.roleId
      };

      // Call auth service to register user - simplified approach
      const registrationResult = this.authService.registerUser(registerData);
      
      this.isLoading = false;
      
      if (registrationResult.success) {
        this.successMessage = 'Registration successful! Please login.';
        // Simple timeout without RxJS
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        if (registrationResult.message.includes('already exists')) {
          this.userAlreadyExists = true;
          this.errorMessage = 'User with this email already exists';
        } else {
          this.errorMessage = registrationResult.message || 'Registration failed';
        }
      }
    } else {
      this.errorMessage = 'Please fill all required fields correctly';
    }
  }

  // Reset form method
  public resetForm(): void {
    this.userData = {
      firstname: '',
      lastname: '',
      email: '',
      phone: 0,
      password: '',
      gender: 'female',
      roleId: 2
    };
    this.errorMessage = '';
    this.successMessage = '';
    this.userAlreadyExists = false;
    
    if (this.registerForm) {
      this.registerForm.resetForm();
    }
  }

  // Method to patch specific values
  public patchPhoneValue(): void {
    this.userData.phone = 9825566774;
  }

  // Validation methods for template
  public isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.userData.email);
  }

  public isPasswordValid(): boolean {
    return this.userData.password.length >= 6;
  }

  public isPhoneValid(): boolean {
    return this.userData.phone.toString().length === 10;
  }

  // Method to check if form is valid
  public isFormValid(): boolean {
    return this.userData.firstname.length > 0 &&
           this.userData.lastname.length > 0 &&
           this.isEmailValid() &&
           this.isPasswordValid() &&
           this.isPhoneValid();
  }

  // Helper method to get full name (for interpolation)
  public getFullName(): string {
    return `${this.userData.firstname} ${this.userData.lastname}`.trim();
  }

  // Method to capitalize first letter (basic string manipulation)
  public capitalizeFirst(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
