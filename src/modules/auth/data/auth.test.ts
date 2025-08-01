import axios from "axios";
import moxios from "moxios";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AuthError, NotFoundError, ServerError, UnknownApiError, ValidationError } from "@/lib/api/error";
import type { ForgotPasswordInput, ForgotPasswordOutput } from "../model/forgot-password";
import type { LoginInput, LoginOutput } from "../model/login";
import type { OTPInput, OTPOutput } from "../model/otp";
import type { RegisterInput, RegisterOutput } from "../model/register";
import type { ResetPasswordInput, ResetPasswordOutput } from "../model/reset-password";
import { AuthDataSource } from "./auth";

describe("AuthDataSource", () => {
  const api = axios.create();
  const dataSource = new AuthDataSource(api);

  beforeEach(() => {
    moxios.install(api);
  });

  afterEach(() => {
    moxios.uninstall(api);
  });

  describe("login", () => {
    it("success: should return login response", async () => {
      const mockRequest: LoginInput = { email: "test@example.com", password: "password123" };
      const mockResponse: LoginOutput = {
        accessToken: "fake-access-token",
        refreshToken: "fake-refresh-token",
      };
      moxios.stubRequest("/auth/login", { status: 200, response: { data: mockResponse } });
      const response = await dataSource.login(mockRequest);
      expect(response).toEqual(mockResponse);
    });

    it("failure: should throw an AuthError", async () => {
      const mockRequest: LoginInput = { email: "wrong@example.com", password: "wrong" };
      moxios.stubRequest("/auth/login", {
        status: 401,
        response: { message: "Invalid credentials" },
      });
      await expect(dataSource.login(mockRequest)).rejects.toThrow(AuthError);
    });

    it("failure: should throw an UnknownApiError", async () => {
      const mockRequest: LoginInput = { email: "wrong@example.com", password: "wrong" };
      moxios.stubRequest("/auth/login", {
        status: 503,
        response: { message: "service unavailable" },
      });
      await expect(dataSource.login(mockRequest)).rejects.toThrow(UnknownApiError);
    });
  });

  describe("register", () => {
    it("success: should return register response", async () => {
      const mockRequest: RegisterInput = {
        email: "test@example.com",
        password: "password123",
        fullName: "John Doe",
      };
      const mockResponse: RegisterOutput = { message: "Registration successful!" };
      moxios.stubRequest("/auth/register", { status: 200, response: { data: mockResponse } });
      const response = await dataSource.register(mockRequest);
      expect(response).toEqual(mockResponse);
    });

    it("failure: should throw a ValidationError on conflict", async () => {
      const mockRequest: RegisterInput = {
        email: "exists@example.com",
        password: "password123",
        fullName: "John Doe",
      };
      moxios.stubRequest("/auth/register", {
        status: 409,
        response: { message: "Email already exists" },
      });
      await expect(dataSource.register(mockRequest)).rejects.toThrow(ValidationError);
    });
  });

  describe("forgotPassword", () => {
    it("success: should return forgotPassword response", async () => {
      const mockRequest: ForgotPasswordInput = { email: "test@example.com" };
      const mockResponse: ForgotPasswordOutput = { message: "Forgot password successful!" };
      moxios.stubRequest("/auth/forgot-password", { status: 200, response: { data: mockResponse } });
      const response = await dataSource.forgotPassword(mockRequest);
      expect(response).toEqual(mockResponse);
    });

    it("failure: should throw a ServerError on 500", async () => {
      const mockRequest: ForgotPasswordInput = { email: "notfound@example.com" };
      moxios.stubRequest("/auth/forgot-password", {
        status: 500,
        response: { message: "Internal Server Error" },
      });
      await expect(dataSource.forgotPassword(mockRequest)).rejects.toThrow(ServerError);
    });
  });

  describe("verifyOTP", () => {
    it("success: should return verifyOTP response", async () => {
      const mockRequest: OTPInput = { pin: "123456" };
      const mockResponse: OTPOutput = { message: "Verify OTP successful!" };
      moxios.stubRequest("/auth/verify-otp", { status: 200, response: { data: mockResponse } });
      const response = await dataSource.verifyOTP(mockRequest);
      expect(response).toEqual(mockResponse);
    });

    it("failure: should throw a NotFoundError on 404", async () => {
      const mockRequest: OTPInput = { pin: "wrong-pin" };
      moxios.stubRequest("/auth/verify-otp", {
        status: 404,
        response: { message: "OTP not found" },
      });
      await expect(dataSource.verifyOTP(mockRequest)).rejects.toThrow(NotFoundError);
    });
  });

  describe("resetPassword", () => {
    it("success: should return resetPassword response", async () => {
      const mockRequest: ResetPasswordInput = { password: "new-password" };
      const mockResponse: ResetPasswordOutput = { message: "Reset password successful!" };
      moxios.stubRequest("/auth/reset-password", { status: 200, response: { data: mockResponse } });
      const response = await dataSource.resetPassword(mockRequest);
      expect(response).toEqual(mockResponse);
    });

    it("failure: should throw a ValidationError on 400", async () => {
      const mockRequest: ResetPasswordInput = { password: "weak" };
      moxios.stubRequest("/auth/reset-password", {
        status: 400,
        response: { message: "Password is too weak" },
      });
      await expect(dataSource.resetPassword(mockRequest)).rejects.toThrow(ValidationError);
    });
  });
});
