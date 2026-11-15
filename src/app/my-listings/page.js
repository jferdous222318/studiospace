"use client";
import { onImgError } from "@/lib/constants";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { api } from "@/lib/api";
import PrivateRoute from "@/components/PrivateRoute";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";

function MyListings() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api("/studios/mine")
      .then(setStudios)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await api(`/studios/${toDelete._id}`, { method: "DELETE" });
      setStudios((list) => list.filter((s) => s._id !== toDelete._id));
      toast.success("Studio deleted successfully");
      setToDelete(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loader fullPage text="Loading your listings..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="section-title">My Studio Listings</h1>
          <p className="section-sub">Manage the spaces you host.</p>
        </div>
        <Link href="/add-studio" className="btn btn-primary">Add New Studio</Link>
      </div>

      {studios.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-base-300 rounded-box">
          <h3 className="text-xl font-bold">You have not listed any studios yet</h3>
          <p className="opacity-70 mt-1 mb-5">List your first space and start getting bookings.</p>
          <Link href="/add-studio" className="btn btn-primary">Add your first studio</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead>
              <tr>
                <th>Studio</th>
                <th>Category</th>
                <th>Rate</th>
                <th>Capacity</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studios.map((s) => (
                <tr key={s._id}>
                  <td>
                    <div className="flex items-center gap-3 min-w-56">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.image} alt={s.title} onError={onImgError} className="size-14 rounded-lg object-cover shrink-0" />
                      <div>
                        <Link href={`/studios/${s._id}`} className="font-bold hover:text-primary">{s.title}</Link>
                        <p className="text-xs opacity-70">{s.location}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-primary badge-outline whitespace-nowrap">{s.category}</span></td>
                  <td className="whitespace-nowrap">${s.hourlyRate} / hr</td>
                  <td>{s.maxCapacity}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Link href={`/studios/edit/${s._id}`} className="btn btn-sm btn-outline gap-1"><FiEdit2 /> Update</Link>
                      <button onClick={() => setToDelete(s)} className="btn btn-sm btn-error btn-outline gap-1"><FiTrash2 /> Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={!!toDelete}
        onClose={() => !deleting && setToDelete(null)}
        title="Delete this studio?"
        actions={
          <>
            <button onClick={() => setToDelete(null)} disabled={deleting} className="btn btn-ghost">Cancel</button>
            <button onClick={confirmDelete} disabled={deleting} className="btn btn-error">
              {deleting ? <span className="loading loading-spinner loading-sm" /> : "Yes, delete"}
            </button>
          </>
        }
      >
        <p className="opacity-80">
          <span className="font-semibold">{toDelete?.title}</span> will be permanently removed. This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}

export default function MyListingsPage() {
  return (
    <PrivateRoute>
      <MyListings />
    </PrivateRoute>
  );
}