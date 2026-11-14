"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { TbAperture } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";
import PasswordInput from "@/components/PasswordInput";
import GoogleButton from "@/components/GoogleButton";
import Loader from "@/components/Loader";

function LoginForm() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const raw = params.get("redirect") || "/";
  const redirect = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // already logged in? go to the desired page
  useEffect(() => {
    if (!loading && user) router.replace(redirect);
  }, [loading, user, redirect, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Welcome back to StudioSpace!");
      router.replace(redirect);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || user) return <Loader fullPage />;

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-200 border border-base-300 shadow-sm">
        <form onSubmit={handleSubmit} className="card-body gap-4">
          <div className="text-center">
            <TbAperture className="size-10 text-primary mx-auto" />
            <h1 className="section-title mt-2">Login to StudioSpace</h1>
            <p className="text-sm opacity-70 mt-1">Pick up where you left off.</p>
          </div>

          {error && (
            <div role="alert" className="alert alert-error alert-soft text-sm py-2">
              {error}
            </div>
          )}

          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium">Email</span>
            <input name="email" type="email" placeholder="you@email.com" className="input input-bordered w-full" autoComplete="email" />
          </label>

          <div className="form-control w-full">
            <span className="label-text mb-1 font-medium">Password</span>
            <PasswordInput />
            <button
              type="button"
              onClick={() => toast("Password reset is coming soon.", { icon: "🔒" })}
              className="link link-hover text-xs mt-2 self-end"
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
            {submitting ? <span className="loading loading-spinner loading-sm" /> : "Login"}
          </button>

          <div className="divider text-xs my-0">OR</div>
          <GoogleButton onDone={() => router.replace(redirect)} />

          <p className="text-sm text-center">
            New to StudioSpace?{" "}
            <Link href="/register" className="link link-primary font-semibold">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader fullPage />}>
      <LoginForm />
    </Suspense>
  );
}