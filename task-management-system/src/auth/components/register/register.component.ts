import { Component, ViewChild, OnInit, NgModule } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { User, RegisterRequest } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Constants } from '../../constants/constants';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;

  // Component properties for data binding
  public defaultgender: string = Constants.defaultGender;
  public isLoading: boolean = false;
  public errorMessage: string = '';
  public successMessage: string = '';
  public userAlreadyExists: boolean = false;
  
  // Gender options for dropdown using constants
  public genderOptions = Constants.genderOptions;

  // Dependency injection in constructor
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }
  
  // Submit form method - simplified without RxJS
  public submitForm(formData: NgForm): void {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';
    this.userAlreadyExists = false;

    console.log('Form submitted:', formData.value);
    if (formData.valid) {
      this.isLoading = true;

      // Prepare registration data using form values
      const registerData: RegisterRequest = {
        firstName: formData.value.firstname,
        lastName: formData.value.lastname,
        email: formData.value.email,
        password: formData.value.password,
        roleId: Constants.defaultRoleId // Use default role ID from constants
      };

      // Call auth service to register user - simplified approach
      console.log('Registering user:', registerData);
      this.authService.registerUser(registerData);
      
      this.isLoading = false;
      
      // Since the service method is void, we'll simulate success for now
      this.successMessage = 'Registration request sent successfully! Please check console for response.';
      // Simple timeout without RxJS
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.errorMessage = 'Please fill all required fields correctly';
    }
  }

  // Reset form method
  public resetForm(): void {
    if (this.registerForm) {
      this.registerForm.resetForm();
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.userAlreadyExists = false;
  }

  // Validation methods for template using form data
  public isEmailValid(formData: NgForm): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.value.email || '');
  }

  public isPasswordValid(formData: NgForm): boolean {
    return (formData.value.password || '').length >= 6;
  }

  public isPhoneValid(formData: NgForm): boolean {
    return (formData.value.phone || '').toString().length === 10;
  }

  // Method to check if form is valid using form data
  public isFormValid(formData: NgForm): boolean {
    return (formData.value.firstname || '').length > 0 &&
           (formData.value.lastname || '').length > 0 &&
           this.isEmailValid(formData) &&
           this.isPasswordValid(formData) &&
           this.isPhoneValid(formData);
  }

  // Helper method to get full name using form data
  public getFullName(formData: NgForm): string {
    const firstname = formData.value.firstname || '';
    const lastname = formData.value.lastname || '';
    return `${firstname} ${lastname}`.trim();
  }

 
}
