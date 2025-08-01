import { type DataSource, authData } from "../data/auth";
import type { ForgotPasswordInput, ForgotPasswordOutput } from "../model/forgot-password";
import type { LoginInput, LoginOutput } from "../model/login";
import type { OTPInput, OTPOutput } from "../model/otp";
import type { RegisterInput, RegisterOutput } from "../model/register";
import type { ResetPasswordInput, ResetPasswordOutput } from "../model/reset-password";

interface Service {
  login(params: LoginInput): Promise<LoginOutput>;
  register(params: RegisterInput): Promise<RegisterOutput>;
  forgotPassword(email: ForgotPasswordInput): Promise<ForgotPasswordOutput>;
  verifyOTP(params: OTPInput): Promise<OTPOutput>;
  resetPassword(params: ResetPasswordInput): Promise<ResetPasswordOutput>;
}

export class AuthService implements Service {
  private readonly data: DataSource;

  constructor(data: DataSource) {
    this.data = data;
  }

  async login(params: LoginInput): Promise<LoginOutput> {
    return await this.data.login(params);
  }

  async register(params: RegisterInput): Promise<RegisterOutput> {
    return await this.data.register(params);
  }

  async forgotPassword(params: ForgotPasswordInput): Promise<ForgotPasswordOutput> {
    return await this.data.forgotPassword(params);
  }

  async verifyOTP(params: OTPInput): Promise<OTPOutput> {
    return await this.data.verifyOTP(params);
  }

  async resetPassword(params: ResetPasswordInput): Promise<ResetPasswordOutput> {
    return await this.data.resetPassword(params);
  }
}

export const authService = new AuthService(authData);
