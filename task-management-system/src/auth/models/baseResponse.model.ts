// Simplified response interface without generics
export interface SimpleResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}