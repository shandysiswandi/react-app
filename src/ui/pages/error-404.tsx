import { Link } from "react-router";
import { routes } from "@/lib/constants/route";
import { Button } from "@/ui/components/ui/button";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center space-y-6 text-center"
      data-testid="not-found-page"
    >
      <h1 className="text-9xl font-extrabold text-gray-900 dark:text-gray-100">404</h1>
      <h2 className="text-3xl font-bold">Page Not Found</h2>

      <p className="text-muted-foreground max-w-lg text-lg">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <Button asChild>
        <Link to={routes.root}>Go Back Home</Link>
      </Button>
    </div>
  );
}
