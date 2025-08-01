import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { routes } from "@/lib/constants/route";
import { useAuthStore } from "@/lib/stores/auth";

/**
 * The container component acting as the entry point for the feature.
 */
export default function Container() {
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();
  const location = useLocation();
  const [handled, setHandled] = useState(false);

  useEffect(() => {
    if (handled) return;

    const searchParams = new URLSearchParams(location.search);
    const state = searchParams.get("state"); // oauth, verify_email
    const error = searchParams.get("error"); // invalid_or_expired_token
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    let redirectTo: string = routes.login; // default fallback

    if (state === "oauth" && accessToken && refreshToken) {
      setToken(accessToken);
      toast.success("Login with google successful!");
      redirectTo = routes.root;
    }

    if (state === "verify_email") {
      if (error) toast.error(`verify email failed because: ${error}`);
      else toast.success("Verify email successful! Please Sign In.");
      redirectTo = routes.login;
    }

    // Clean the URL by removing all query parameters
    navigate(location.pathname, { replace: true });

    // Navigate to the intended page after cleaning URL
    navigate(redirectTo, { replace: true });

    setHandled(true);
  }, [location.search, location.pathname, navigate, setToken, handled]);

  return null;
}
