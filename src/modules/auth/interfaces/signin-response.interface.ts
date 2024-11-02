export interface SignInResponse {
  token?: string;
  message?: string;
  role?: string;
  success: boolean;
}