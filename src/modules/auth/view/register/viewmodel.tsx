import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authService } from "@/modules/auth/service/auth";
import { type SchemaType, schema } from "./schema";

export const useViewModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegister = async (data: SchemaType) => {
    setIsLoading(true);
    try {
      const response = await authService.register({ ...data });
      toast.info(response.message);
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
  };

  return {
    form,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    handleRegister,
    onClickGoogle,
  };
};
