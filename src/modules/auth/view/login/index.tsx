import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { routes } from "@/lib/constants/route";
import { Button } from "@/ui/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/components/ui/form";
import { Input } from "@/ui/components/ui/input";
import { useViewModel } from "./viewmodel";

const Page = () => {
  const { form, isLoading, showPassword, togglePasswordVisibility, handleLogin, onClickGoogle } =
    useViewModel();

  return (
    <>
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your account below to login to your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col gap-6">
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} disabled={isLoading} autoComplete="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        disabled={isLoading}
                        autoComplete="current-password"
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
                      {showPassword ? (
                        <EyeOff className="text-muted-foreground h-4 w-4" />
                      ) : (
                        <Eye className="text-muted-foreground h-4 w-4" />
                      )}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                  <div className="text-right">
                    <Link to={routes.forgotPassword} className="text-sm underline-offset-4 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </Form>

      <div className="mt-6 flex flex-col gap-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={onClickGoogle} disabled={isLoading}>
          <img src="/google.svg" alt="Google icon" className="mr-2 size-4" />
          Continue with Google
        </Button>

        <div className="text-center text-sm">
          <span>Don&apos;t have an account? </span>
          <Link to={routes.register} className="underline underline-offset-4 hover:underline">
            Sign Up
          </Link>
        </div>
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
