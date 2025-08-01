import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { useAuthStore } from "@/lib/stores/auth";
import { Loading } from "@/ui/components/loading";
import { ThemeProvider } from "@/ui/components/theme-provider";
import { Toaster } from "@/ui/components/ui/sonner";
import { ErrorBoundary } from "../ui/pages/error-500";
import { routes } from "./routes";

export default function App() {
  const { setLoading } = useAuthStore();

  useEffect(() => {
    // When the app mounts, the persist middleware has already rehydrated the auth state from cookies.
    // We can now safely set isLoading to false to allow the ProtectedRoute to render.
    setLoading(false);
  }, [setLoading]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="app-ui-theme">
      <Toaster position="top-center" richColors />

      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Routes>
              {routes.map(({ layout: Layout, protector: Wrapper, routes: layoutRoutes }) => {
                // Create the nested route structure
                let routeElement = (
                  <>
                    {layoutRoutes.map(({ path, element: Element, title }) => (
                      <Route key={title} path={path} element={<Element />} />
                    ))}
                  </>
                );

                // Wrap with Layout if it exists
                if (Layout) {
                  routeElement = <Route element={<Layout />}>{routeElement}</Route>;
                }

                // Wrap with Wrapper if it exists
                if (Wrapper) {
                  routeElement = <Route element={<Wrapper />}>{routeElement}</Route>;
                }

                return routeElement;
              })}
            </Routes>
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
