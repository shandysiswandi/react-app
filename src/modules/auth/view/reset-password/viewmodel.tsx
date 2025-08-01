import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { routes } from "@/lib/constants/route";
import { authService } from "@/modules/auth/service/auth";
import { type SchemaType, schema } from "./schema";

export const useViewModel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!location.state?.isfromOtp) {
      toast.error("Unauthorized access. Please go through the forgot password process.");
      navigate(routes.login, { replace: true });
    }
  }, [location.state, navigate]);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const handleResetPassword = async (data: SchemaType) => {
    setIsLoading(true);
    try {
      const response = await authService.resetPassword({ ...data });
      toast.success(response.message);
      navigate(routes.login);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleResetPassword,
  };
};
