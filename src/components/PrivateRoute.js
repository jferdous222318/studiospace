"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "./Loader";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [loading, user, router, pathname]);

  // while the session is being restored we show a loader, so reload never kicks you to /login
  if (loading || !user) return <Loader fullPage />;
  return children;
}