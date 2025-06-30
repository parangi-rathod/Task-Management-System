export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: number; // Changed from 0 to integer for phone number
  password: string;
  gender: string;
  roleId: number;
  roleName?: string;
  createdAt?: Date;
  isActive?: boolean;
  profilePicture?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId?: number;
}


// Additional interfaces for beginner concepts
export interface Role {
  id: number;
  name: string;
  description: string;
}



export interface Task {
  id?: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'InProgress' | 'Completed';
  dueDate: string;
  userId: number;
  createdAt?: string;
  isCompleted?: boolean;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  taskCount: number;
  completedTasks: number;
  joinDate: string;
}

// Types for component interaction
export type UserStatus = 'active' | 'inactive' | 'pending';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Pending' | 'InProgress' | 'Completed';

// Interface for form data (template-driven forms)
export interface ContactForm {
  name: string;
  email: string;
  message: string;
  subject: string;
}

// Interface for navigation items
export interface NavigationItem {
  label: string;
  route: string;
  icon?: string;
  roles?: number[];
  isActive?: boolean;
}

// Interface for dashboard statistics
export interface DashboardStats {
  totalUsers: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  activeUsers: number;
}
