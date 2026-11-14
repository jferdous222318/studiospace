"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TbAperture } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";
import PasswordInput from "@/components/PasswordInput";
import GoogleButton from "@/components/GoogleButton";
import Loader from "@/components/Loader";

function checkPassword(p) {
    if (p.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(p)) return "Password must have an uppercase letter";
    if (!/[a-z]/.test(p)) return "Password must have a lowercase letter";
    return "";
}

export default function RegisterPage() {
    const { user, loading, register } = useAuth();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!loading && user) router.replace("/");
    }, [loading, user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = {
            name: String(fd.get("name") || "").trim(),
            email: String(fd.get("email") || "").trim(),
            photoURL: String(fd.get("photoURL") || "").trim(),
            password: String(fd.get("newPassword") || ""),
        };

        const errs = {};
        if (!data.name) errs.name = "Name is required";
        if (!data.email) errs.email = "Email is required";
        const pw = checkPassword(data.password);
        if (pw) errs.password = pw;
        setErrors(errs);
        if (Object.keys(errs).length) {
            toast.error(Object.values(errs)[0]);
            return;
        }

        setSubmitting(true);
        try {
            await register(data);
            toast.success("Account created! Please log in.");
            router.push("/login");
        } catch (err) {
            setErrors({ form: err.message });
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || user) return <Loader fullPage />;

    return (
        <div className="max-w-md mx-auto px-4 py-12">
            <div className="card bg-base-200 border border-base-300 shadow-sm">
                <form onSubmit={handleSubmit} className="card-body gap-4" noValidate>
                    <div className="text-center">
                        <TbAperture className="size-10 text-primary mx-auto" />
                        <h1 className="section-title mt-2">Create your account</h1>
                        <p className="text-sm opacity-70 mt-1">Book studios or host your own space.</p>
                    </div>

                    {errors.form && (
                        <div role="alert" className="alert alert-error alert-soft text-sm py-2">
                            {errors.form}
                        </div>
                    )}

                    <label className="form-control w-full">
                        <span className="label-text mb-1 font-medium">Name</span>
                        <input name="name" type="text" placeholder="Your full name" className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`} />
                        {errors.name && <span className="text-error text-xs mt-1">{errors.name}</span>}
                    </label>

                    <label className="form-control w-full">
                        <span className="label-text mb-1 font-medium">Email</span>
                        <input name="email" type="email" placeholder="you@email.com" className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`} />
                        {errors.email && <span className="text-error text-xs mt-1">{errors.email}</span>}
                    </label>

                    <label className="form-control w-full">
                        <span className="label-text mb-1 font-medium">Photo URL</span>
                        <input name="photoURL" type="url" placeholder="https://example.com/photo.jpg" className="input input-bordered w-full" />
                    </label>

                    <div className="form-control w-full">
                        <span className="label-text mb-1 font-medium">Password</span>
                        <PasswordInput name="newPassword" placeholder="Min 6 chars, upper and lower case" invalid={!!errors.password} />
                        {errors.password && <span className="text-error text-xs mt-1">{errors.password}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
                        {submitting ? <span className="loading loading-spinner loading-sm" /> : "Register"}
                    </button>

                    <div className="divider text-xs my-0">OR</div>
                    <GoogleButton onDone={() => router.replace("/")} />

                    <p className="text-sm text-center">
                        Already have an account?{" "}
                        <Link href="/login" className="link link-primary font-semibold">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}