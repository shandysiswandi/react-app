import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { routes } from "@/lib/constants/route";
import { Button } from "@/ui/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/components/ui/form";
import { Input } from "@/ui/components/ui/input";
import { useViewModel } from "./viewmodel";

const Page = () => {
  const { form, isLoading, showPassword, togglePasswordVisibility, handleRegister, onClickGoogle } =
    useViewModel();

  return (
    <>
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your information below to create your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className="flex flex-col gap-6">
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} disabled={isLoading} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} disabled={isLoading} autoComplete="off" />
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
                        autoComplete="new-password"
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
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
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
      </div>

      <div className="mt-6 text-center text-sm">
        <span>Already have an account? </span>
        <Link to={routes.login} className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </>
  );
};

/**
 * The container component acting as the entry point for the feature.
 */
export default function RegisterContainer() {
  return <Page />;
}
