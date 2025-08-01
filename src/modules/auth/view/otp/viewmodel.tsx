import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { otpExpiry } from "@/lib/constants/app";
import { routes } from "@/lib/constants/route";
import { authService } from "@/modules/auth/service/auth";
import { type SchemaType, schema } from "./schema";

export const useViewModel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(otpExpiry);

  const email = useMemo(() => {
    return location.state?.email || searchParams.get("email");
  }, [location.state, searchParams]);

  const from = location.state?.from;

  useEffect(() => {
    if (!email) {
      toast.error("Unauthorized access. Please start the process again.");
      navigate(routes.login, { replace: true });
    }
  }, [email, navigate]);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      pin: "",
    },
  });

  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerifyOtp = async (data: SchemaType) => {
    setIsLoading(true);
    try {
      await authService.verifyOTP({ ...data });
      toast.success("Verification successful!");

      if (from === routes.forgotPassword) {
        navigate(routes.resetPassword, { state: { isfromOtp: true } });
      } else {
        navigate(routes.login);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;

    toast.info("A new OTP has been sent to your email.");
    setCountdown(otpExpiry);
  };

  return {
    form,
    isLoading,
    email: email || "",
    countdown,
    handleVerifyOtp,
    handleResendOtp,
  };
};
