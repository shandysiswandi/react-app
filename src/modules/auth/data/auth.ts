import { type AxiosInstance } from "axios";
import { type ApiResponse, authClient } from "@/lib/api/axios";
import { handleAxiosError } from "@/lib/api/error-axios";
import type { ForgotPasswordInput, ForgotPasswordOutput } from "../model/forgot-password";
import type { LoginInput, LoginOutput } from "../model/login";
import type { OTPInput, OTPOutput } from "../model/otp";
import type { RegisterInput, RegisterOutput } from "../model/register";
import type { ResetPasswordInput, ResetPasswordOutput } from "../model/reset-password";

export interface DataSource {
  login(params: LoginInput): Promise<LoginOutput>;
  register(params: RegisterInput): Promise<RegisterOutput>;
  forgotPassword(email: ForgotPasswordInput): Promise<ForgotPasswordOutput>;
  verifyOTP(params: OTPInput): Promise<OTPOutput>;
  resetPassword(params: ResetPasswordInput): Promise<ResetPasswordOutput>;
}

export class AuthDataSource implements DataSource {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async login(params: LoginInput): Promise<LoginOutput> {
    try {
      const resp = await this.api.post<ApiResponse<LoginOutput>>("/auth/login", params);

      return resp.data.data;
    } catch (error) {
      handleAxiosError(error, "login");
    }
  }

  async register(params: RegisterInput): Promise<RegisterOutput> {
    try {
      const resp = await this.api.post<ApiResponse<RegisterOutput>>("/auth/register", {
        ...params,
        full_name: params.fullName,
      });

      return resp.data.data;
    } catch (error) {
      handleAxiosError(error, "register");
    }
  }

  async forgotPassword(params: ForgotPasswordInput): Promise<ForgotPasswordOutput> {
    try {
      const resp = await this.api.post<ApiResponse<ForgotPasswordOutput>>("/auth/forgot-password", params);

      return resp.data.data;
    } catch (error) {
      handleAxiosError(error, "forgot password");
    }
  }

  async verifyOTP(params: OTPInput): Promise<OTPOutput> {
    try {
      const resp = await this.api.post<ApiResponse<OTPOutput>>("/auth/verify-otp", params);

      return resp.data.data;
    } catch (error) {
      handleAxiosError(error, "verify otp");
    }
  }

  async resetPassword(params: ResetPasswordInput): Promise<ResetPasswordOutput> {
    try {
      const resp = await this.api.post<ApiResponse<ResetPasswordOutput>>("/auth/reset-password", params);

      return resp.data.data;
    } catch (error) {
      handleAxiosError(error, "reset password");
    }
  }
}

export const authData = new AuthDataSource(authClient);
