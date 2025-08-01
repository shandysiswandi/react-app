import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthError, ServerError, ValidationError } from "@/lib/api/error";
import type { DataSource } from "../data/auth";
import { AuthService } from "./auth";

describe("AuthService", () => {
  let mockDataSource: DataSource;
  let authService: AuthService;

  beforeEach(() => {
    mockDataSource = {
      login: vi.fn(),
      register: vi.fn(),
      forgotPassword: vi.fn(),
      verifyOTP: vi.fn(),
      resetPassword: vi.fn(),
    };
    authService = new AuthService(mockDataSource);
  });

  describe("login", () => {
    it("success: should call data.login and return the result on success", async () => {
      const params = { email: "test@example.com", password: "password" };
      const expectedResponse = { accessToken: "abc", refreshToken: "xyz" };
      vi.mocked(mockDataSource.login).mockResolvedValue(expectedResponse);

      const result = await authService.login(params);
      expect(result).toEqual(expectedResponse);
      expect(mockDataSource.login).toHaveBeenCalledWith(params);
    });

    it("failure: should throw an error when data.login fails", async () => {
      const params = { email: "test@example.com", password: "password" };
      const expectedError = new AuthError("Invalid credentials");
      vi.mocked(mockDataSource.login).mockRejectedValue(expectedError);

      await expect(authService.login(params)).rejects.toThrow(expectedError);
    });
  });

  describe("register", () => {
    it("success: should call data.register and return the result on success", async () => {
      const params = { fullName: "Test", email: "test@example.com", password: "password" };
      const expectedResponse = { message: "Success" };
      vi.mocked(mockDataSource.register).mockResolvedValue(expectedResponse);

      const result = await authService.register(params);
      expect(result).toEqual(expectedResponse);
      expect(mockDataSource.register).toHaveBeenCalledWith(params);
    });

    it("failure: should throw an error when data.register fails", async () => {
      const params = { fullName: "Test", email: "test@example.com", password: "password" };
      const expectedError = new ValidationError("Email already exists");
      vi.mocked(mockDataSource.register).mockRejectedValue(expectedError);

      await expect(authService.register(params)).rejects.toThrow(expectedError);
    });
  });

  describe("forgotPassword", () => {
    it("success: should call data.forgotPassword and return the result on success", async () => {
      const params = { email: "test@example.com" };
      const expectedResponse = { message: "Email sent" };
      vi.mocked(mockDataSource.forgotPassword).mockResolvedValue(expectedResponse);

      const result = await authService.forgotPassword(params);
      expect(result).toEqual(expectedResponse);
      expect(mockDataSource.forgotPassword).toHaveBeenCalledWith(params);
    });

    it("failure: should throw an error when data.forgotPassword fails", async () => {
      const params = { email: "test@example.com" };
      const expectedError = new ServerError("Server issue");
      vi.mocked(mockDataSource.forgotPassword).mockRejectedValue(expectedError);

      await expect(authService.forgotPassword(params)).rejects.toThrow(expectedError);
    });
  });

  describe("verifyOTP", () => {
    it("success: should call data.verifyOTP and return the result on success", async () => {
      const params = { pin: "123456" };
      const expectedResponse = { message: "OTP verified" };
      vi.mocked(mockDataSource.verifyOTP).mockResolvedValue(expectedResponse);

      const result = await authService.verifyOTP(params);
      expect(result).toEqual(expectedResponse);
      expect(mockDataSource.verifyOTP).toHaveBeenCalledWith(params);
    });

    it("failure: should throw an error when data.verifyOTP fails", async () => {
      const params = { pin: "123456" };
      const expectedError = new ValidationError("Invalid OTP");
      vi.mocked(mockDataSource.verifyOTP).mockRejectedValue(expectedError);

      await expect(authService.verifyOTP(params)).rejects.toThrow(expectedError);
    });
  });

  describe("resetPassword", () => {
    it("success: should call data.resetPassword and return the result on success", async () => {
      const params = { password: "newPassword123!" };
      const expectedResponse = { message: "Password reset" };
      vi.mocked(mockDataSource.resetPassword).mockResolvedValue(expectedResponse);

      const result = await authService.resetPassword(params);
      expect(result).toEqual(expectedResponse);
      expect(mockDataSource.resetPassword).toHaveBeenCalledWith(params);
    });

    it("failure: should throw an error when data.resetPassword fails", async () => {
      const params = { password: "newPassword123!" };
      const expectedError = new ValidationError("Password too weak");
      vi.mocked(mockDataSource.resetPassword).mockRejectedValue(expectedError);

      await expect(authService.resetPassword(params)).rejects.toThrow(expectedError);
    });
  });
});
