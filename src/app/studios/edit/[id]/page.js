"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/StudioForm";
import Loader from "@/components/Loader";

function EditStudio() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api(`/studios/${id}`)
      .then(setStudio)
      .catch(() => setStudio(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader fullPage text="Loading listing..." />;

  if (!studio)
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="section-title">Studio not found</h1>
        <Link href="/my-listings" className="btn btn-primary mt-6">Back to My Listings</Link>
      </div>
    );

  if (studio.ownerEmail !== user.email)
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="section-title">Not allowed</h1>
        <p className="section-sub mx-auto">You can only edit your own listings.</p>
        <Link href="/my-listings" className="btn btn-primary mt-6">Back to My Listings</Link>
      </div>
    );

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api(`/studios/${id}`, { method: "PUT", body: data });
      toast.success("Studio updated successfully!");
      router.push("/my-listings");
    } catch (e) {
      toast.error(e.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="section-title">Update Studio</h1>
      <p className="section-sub mb-8">Edit the details of {studio.title}.</p>
      <div className="card bg-base-200 border border-base-300">
        <div className="card-body">
          <StudioForm initial={studio} user={user} onSubmit={handleSubmit} submitLabel="Save Changes" submitting={submitting} />
        </div>
      </div>
    </div>
  );
}

export default function EditStudioPage() {
  return (
    <PrivateRoute>
      <EditStudio />
    </PrivateRoute>
  );
}