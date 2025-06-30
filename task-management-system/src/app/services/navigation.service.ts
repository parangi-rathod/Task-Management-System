import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from '../../auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  
  // Navigation items for different user roles
  private adminNavigation: NavigationItem[] = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: 'fas fa-tachometer-alt' },
    { label: 'Users', route: '/admin/users', icon: 'fas fa-users' },
    { label: 'All Tasks', route: '/admin/tasks', icon: 'fas fa-tasks' },
    { label: 'Analytics', route: '/admin/analytics', icon: 'fas fa-chart-bar' },
    { label: 'Settings', route: '/admin/settings', icon: 'fas fa-cog' }
  ];

  private userNavigation: NavigationItem[] = [
    { label: 'Dashboard', route: '/user/dashboard', icon: 'fas fa-home' },
    { label: 'My Tasks', route: '/user/tasks', icon: 'fas fa-tasks' },
    { label: 'Calendar', route: '/user/calendar', icon: 'fas fa-calendar' },
    { label: 'Profile', route: '/user/profile', icon: 'fas fa-user' }
  ];

  constructor(private router: Router) { }

  // Get navigation items based on user role
  getNavigationItems(roleId: number): NavigationItem[] {
    return roleId === 1 ? this.adminNavigation : this.userNavigation;
  }

  // Navigate to specific route (basic routing)
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  // Navigate with parameters
  navigateToTask(taskId: number): void {
    this.router.navigate(['/task', taskId]);
  }

  // Navigate to user profile
  navigateToUserProfile(userId: number): void {
    this.router.navigate(['/user/profile', userId]);
  }

  // Go back to previous page
  goBack(): void {
    window.history.back();
  }

  // Check if current route is active (for highlighting nav items)
  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }

  // Logout and redirect
  logout(): void {
    // Clear any stored data
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
