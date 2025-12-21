import LoadingScreen from "@/components/LoadingScreen";
import { AuthContext, AuthProvider } from "@/libs/authprovider";
import { Stack, useSegments } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootRoute />
    </AuthProvider>
  );
}

function RootRoute() {
  const { userToken, loading } = useContext(AuthContext);
  const [isReady, setIsReady] = useState(false);
  const segments = useSegments();
  const loadingTimeoutRef = useRef<number | null>(null);
  const routeHistoryRef = useRef<string[]>([]);

  // Get current route path
  const currentRoute = segments.join("/");

  // Track route history for detecting auth route switches
  useEffect(() => {
    if (
      routeHistoryRef.current[routeHistoryRef.current.length - 1] !==
      currentRoute
    ) {
      routeHistoryRef.current.push(currentRoute);
      // Keep only last 3 routes
      if (routeHistoryRef.current.length > 3) {
        routeHistoryRef.current.shift();
      }
    }
  }, [currentRoute]);

  // Check if current route is an auth route
  const isAuthRoute =
    segments.length > 0 &&
    (segments[0] === "login" || segments[0] === "register");

  // Check if last route was also an auth route (switching between login/register)
  const lastRoute =
    routeHistoryRef.current[routeHistoryRef.current.length - 2] || "";
  const wasOnAuthRoute = lastRoute === "login" || lastRoute === "register";
  const isSwitchingAuthRoutes = wasOnAuthRoute && isAuthRoute;

  useEffect(() => {
    // If we're switching between auth routes, always consider ready to prevent any flash
    if (isSwitchingAuthRoutes) {
      setIsReady(true);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
      return;
    }

    // If we're on an auth route initially, consider ready immediately
    if (isAuthRoute && routeHistoryRef.current.length <= 1) {
      setIsReady(true);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
      return;
    }

    if (!loading) {
      setIsReady(true);
      // Clear any pending loading timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
    } else {
      // Only show loading screen after a small delay
      loadingTimeoutRef.current = window.setTimeout(() => {
        // Re-check if still loading after the delay
        if (loading && !isSwitchingAuthRoutes) {
          setIsReady(false);
        }
      }, 50);
    }

    return () => {
      if (loadingTimeoutRef.current) {
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
        loadingTimeoutRef.current = null;
      }
    };
  }, [loading, isSwitchingAuthRoutes, isAuthRoute]);

  // Don't show loading screen during auth route transitions
  if (!isReady && !isSwitchingAuthRoutes) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#0f0f0f" },
      }}
    >
      {/* Unprotected routes */}
      <Stack.Protected guard={!userToken}>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            animation: "none",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
            animation: "none",
            gestureEnabled: false,
          }}
        />
      </Stack.Protected>

      {/* Protected routes */}
      <Stack.Protected guard={!!userToken}>
        <Stack.Screen
          name="index"
          options={{
            animation: "none",
            headerShown: false
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
