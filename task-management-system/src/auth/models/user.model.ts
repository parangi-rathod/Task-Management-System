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
