export const routes = {
  root: "/",
  //
  callback: "/callback",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  otp: "/otp-verification",
  resetPassword: "/reset-password",
  //
  me: {
    profile: "/me/profile",
    setting: "/me/settings",
  },
  //
  notFound: "*",
} as const;
