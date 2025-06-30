import { Injectable } from '@angular/core';
import { TaskPriority, TaskStatus } from '../../auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  // Utility methods for components
  formatDate(date: string | Date): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString();
  }

  formatDateTime(date: string | Date): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString();
  }

  // Method to get CSS class based on priority (for ngClass examples)
  getPriorityClass(priority: TaskPriority): string {
    switch (priority) {
      case 'High':
        return 'badge bg-danger';
      case 'Medium':
        return 'badge bg-warning';
      case 'Low':
        return 'badge bg-success';
      default:
        return 'badge bg-secondary';
    }
  }

  // Method to get CSS class based on status (for ngClass examples)
  getStatusClass(status: TaskStatus): string {
    switch (status) {
      case 'Completed':
        return 'badge bg-success';
      case 'InProgress':
        return 'badge bg-primary';
      case 'Pending':
        return 'badge bg-warning';
      default:
        return 'badge bg-secondary';
    }
  }

  // Method to calculate days remaining
  getDaysRemaining(dueDate: string): number {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // Method to check if task is overdue
  isOverdue(dueDate: string): boolean {
    return this.getDaysRemaining(dueDate) < 0;
  }

  // Method to get full name (for interpolation examples)
  getFullName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`.trim();
  }

  // Method to generate initials (for display purposes)
  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  // Method to validate email (for form validation)
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Method to generate random color (for UI enhancement)
  getRandomColor(): string {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Method to truncate text (for pipe examples)
  truncateText(text: string, length: number = 50): string {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  }

  // Method to capitalize first letter
  capitalizeFirst(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
