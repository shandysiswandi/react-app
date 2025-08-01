import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { routes } from "@/lib/constants/route";
import { useAuthStore } from "@/lib/stores/auth";
import { authService } from "@/modules/auth/service/auth";
import { type SchemaType, schema } from "./schema";

export const useViewModel = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "admin@admin.com",
      password: "Secret123!",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (fields: SchemaType) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ ...fields });
      setToken(response.accessToken);
      toast.success("Login successful! Redirecting...");
      navigate(routes.root, { replace: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      form.reset();
      setIsLoading(false);
    }
  };

  const onClickGoogle = async () => {
    const url = `${import.meta.env.VITE_BASE_API_URL}/auth/social/google`;
    window.location.assign(url);
    // window.open(response.url, "_blank", "noopener,noreferrer");
  };

  return {
    form,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
    onClickGoogle,
  };
};
