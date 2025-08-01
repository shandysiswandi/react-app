import { type ComponentType, lazy } from "react";
import {
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  LogIn,
  type LucideIcon,
  MessageSquareCode,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import { Navigate, Outlet } from "react-router";
import { routes as rpath } from "@/lib/constants/route";
import { useAuthStore } from "@/lib/stores/auth";
import { Loading } from "@/ui/components/loading";
import AuthLayout from "@/ui/layouts/auth";
import MainLayout from "@/ui/layouts/main";

// --- Lazy-loaded Page Components ---
const NotFound = lazy(() => import("../ui/pages/error-404"));
//
const Callback = lazy(() => import("../modules/callback/view"));
//
const Login = lazy(() => import("../modules/auth/view/login"));
const Register = lazy(() => import("../modules/auth/view/register"));
const ForgotPassword = lazy(() => import("../modules/auth/view/forgot-password"));
const Otp = lazy(() => import("../modules/auth/view/otp"));
const ResetPassword = lazy(() => import("../modules/auth/view/reset-password"));
//
const Dashboard = lazy(() => import("../modules/dashboard/view"));
const Profile = lazy(() => import("../modules/me/view/profile"));
const ProfileSetting = lazy(() => import("../modules/me/view/setting"));

interface RouteType {
  title: string;
  path: string;
  element: ComponentType;
  icon?: LucideIcon;
  isHidden?: boolean; // To hide from navigation menus
  children?: RouteType[];
}

interface RouteLayoutType {
  protector?: ComponentType;
  layout?: ComponentType;
  routes: RouteType[];
}

const AuthRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) return <Loading />;
  if (isAuthenticated) return <Navigate to={rpath.root} replace />;
  return <Outlet />;
};

const MainRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) return <Loading />;
  if (isAuthenticated) return <Outlet />;
  return <Navigate to={rpath.login} replace />;
};

export const routes: RouteLayoutType[] = [
  {
    protector: AuthRoute,
    layout: AuthLayout,
    routes: [
      {
        title: "Login",
        path: rpath.login,
        element: Login,
        icon: LogIn,
        isHidden: true,
      },
      {
        title: "Register",
        path: rpath.register,
        element: Register,
        icon: UserPlus,
        isHidden: true,
      },
      {
        title: "Forgot Password",
        path: rpath.forgotPassword,
        element: ForgotPassword,
        icon: KeyRound,
        isHidden: true,
      },
      {
        title: "OTP Verification",
        path: rpath.otp,
        element: Otp,
        icon: MessageSquareCode,
        isHidden: true,
      },
      {
        title: "Reset Password",
        path: rpath.resetPassword,
        element: ResetPassword,
        icon: LockKeyhole,
        isHidden: true,
      },
    ],
  },
  {
    protector: MainRoute,
    layout: MainLayout,
    routes: [
      {
        title: "Dashboard",
        path: rpath.root,
        element: Dashboard,
        icon: LayoutDashboard,
      },
      {
        title: "Profile",
        path: rpath.me.profile,
        element: Profile,
        icon: User,
      },
      {
        title: "Settings",
        path: rpath.me.setting,
        element: ProfileSetting,
        icon: Settings,
      },
    ],
  },
  {
    routes: [
      {
        title: "Callback",
        path: rpath.callback,
        element: Callback,
        isHidden: true,
      },
      {
        title: "Not Found",
        path: rpath.notFound,
        element: NotFound,
        isHidden: true,
      },
    ],
  },
];
