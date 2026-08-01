'use client';

import { useContext, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { StoreContext } from '../context/authContext';

const PROTECTED_ROUTES = ['/cart', '/checkout', '/account/orders'];
const AUTH_ROUTES = ['/login', '/register'];

/**
 * Checks if current path matches standard routes or sub-routes (e.g., /cart/item)
 */
function isPathMatching(pathname: string, routes: string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, loading } = useContext(StoreContext);
  const router = useRouter();
  const pathname = usePathname();

  // Memoize route flags to prevent unnecessary effect re-executions
  const isProtectedRoute = useMemo(
    () => isPathMatching(pathname, PROTECTED_ROUTES),
    [pathname]
  );
  const isAuthRoute = useMemo(
    () => isPathMatching(pathname, AUTH_ROUTES),
    [pathname]
  );

  useEffect(() => {
    if (loading) return;

    if (isProtectedRoute && !token) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    } else if (isAuthRoute && token) {
      router.replace('/');
    }
  }, [token, loading, pathname, router, isProtectedRoute, isAuthRoute]);

  // Prevent flash of content during loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Strictly block rendering unauthorized/auth route children before redirection
  if ((isProtectedRoute && !token) || (isAuthRoute && token)) {
    return null;
  }

  return <>{children}</>;
}

function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-violet-200" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
          <div className="absolute inset-3 rounded-full bg-primary animate-pulse" />
        </div>
        <div className="flex gap-1 text-lg font-semibold text-gray-700">
          <span>Loading</span>
          <span className="animate-bounce">.</span>
          <span className="animate-bounce [animation-delay:150ms]">.</span>
          <span className="animate-bounce [animation-delay:300ms]">.</span>
        </div>
      </div>
    </div>
  );
}