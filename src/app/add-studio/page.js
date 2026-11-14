"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/StudioForm";

function AddStudio() {
  const { user } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api("/studios", { method: "POST", body: data });
      toast.success("Studio listed successfully!");
      router.push("/my-listings");
    } catch (e) {
      toast.error(e.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="section-title">Add New Studio</h1>
      <p className="section-sub mb-8">Share your space with creators across the platform.</p>
      <div className="card bg-base-200 border border-base-300">
        <div className="card-body">
          <StudioForm user={user} onSubmit={handleSubmit} submitLabel="Publish Studio" submitting={submitting} />
        </div>
      </div>
    </div>
  );
}

export default function AddStudioPage() {
  return (
    <PrivateRoute>
      <AddStudio />
    </PrivateRoute>
  );
}