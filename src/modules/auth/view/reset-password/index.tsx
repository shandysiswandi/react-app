import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { routes } from "@/lib/constants/route";
import { Button } from "@/ui/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/components/ui/form";
import { Input } from "@/ui/components/ui/input";
import { useViewModel } from "./viewmodel";

const Page = () => {
  const {
    form,
    isLoading,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleResetPassword,
  } = useViewModel();

  return (
    <>
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Please create a new password for your account.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResetPassword)} className="flex flex-col gap-6">
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        disabled={isLoading}
                        className="pr-10"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute inset-y-0 right-0 h-full px-3"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                        disabled={isLoading}
                        className="pr-10"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute inset-y-0 right-0 h-full px-3"
                      onClick={toggleConfirmPasswordVisibility}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Set New Password
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <Link to={routes.login} className="underline underline-offset-4">
          Back to Sign In
        </Link>
      </div>
    </>
  );
};

/**
 * The container component acting as the entry point for the feature.
 */
export default function Container() {
  return <Page />;
}
