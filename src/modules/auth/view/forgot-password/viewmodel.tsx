import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { routes } from "@/lib/constants/route";
import { authService } from "@/modules/auth/service/auth";
import { type SchemaType, schema } from "./schema";

export const useViewModel = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async (data: SchemaType) => {
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword({ ...data });
      toast.info(response.message);
      form.reset();
      navigate(routes.otp, {
        replace: true,
        state: { email: data.email, from: routes.forgotPassword },
      });
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
    handleForgotPassword,
  };
};
