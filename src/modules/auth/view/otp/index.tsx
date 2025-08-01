import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";
import { routes } from "@/lib/constants/route";
import { Button } from "@/ui/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/ui/components/ui/input-otp";
import { useViewModel } from "./viewmodel";

const Page = () => {
  const { form, isLoading, email, countdown, handleVerifyOtp, handleResendOtp } = useViewModel();

  return (
    <>
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verify your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          We've sent a 6-digit code to <span className="text-foreground font-semibold">{email}</span>. The
          code expires shortly, so please enter it soon.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleVerifyOtp)} className="flex flex-col gap-6">
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                      <InputOTPGroup className="w-full justify-center">
                        <div className="flex items-center">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </div>

                        <InputOTPSeparator />

                        <div className="flex items-center">
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </div>
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <span>Didn't receive the code? </span>
        <Button
          variant="link"
          className="h-auto p-0"
          onClick={handleResendOtp}
          disabled={isLoading || countdown > 0}
        >
          {countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
        </Button>
      </div>

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
