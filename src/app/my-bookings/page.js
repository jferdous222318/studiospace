"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { onImgError } from "@/lib/constants";
import PrivateRoute from "@/components/PrivateRoute";
import StatusBadge from "@/components/StatusBadge";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";

export const fmtDate = (d) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toCancel, setToCancel] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api("/bookings/mine")
      .then(setBookings)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const cancel = async () => {
    setBusy(true);
    try {
      await api(`/bookings/${toCancel._id}/cancel`, { method: "PATCH" });
      setBookings((list) => list.map((b) => (b._id === toCancel._id ? { ...b, status: "Cancelled" } : b)));
      toast.success("Booking cancelled");
      setToCancel(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Loader fullPage text="Loading your bookings..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="section-title">My Bookings</h1>
      <p className="section-sub mb-8">Track every reservation you have made.</p>

      {bookings.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-base-300 rounded-box">
          <h3 className="text-xl font-bold">No bookings yet</h3>
          <p className="opacity-70 mt-1 mb-5">Find a space and book your first session.</p>
          <Link href="/studios" className="btn btn-primary">Explore Studios</Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {bookings.map((b) => (
            <div key={b._id} className="card card-side bg-base-100 border border-base-300 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.studioImage} alt={b.studioTitle} onError={onImgError} className="w-28 sm:w-40 object-cover shrink-0" />
              <div className="card-body p-4 gap-1">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/studios/${b.studioId}`} className="font-bold hover:text-primary line-clamp-1">{b.studioTitle}</Link>
                  <StatusBadge status={b.status} />
                </div>
                <p className="text-sm opacity-70">{b.studioLocation}</p>
                <p className="text-sm">{fmtDate(b.date)} · {b.startTime} to {b.endTime}</p>
                <p className="text-sm opacity-70">{b.guests} guest{b.guests > 1 ? "s" : ""} · {b.hours} hr</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="font-extrabold text-lg">${b.totalPrice}</p>
                  {b.status === "Pending" && (
                    <button onClick={() => setToCancel(b)} className="btn btn-sm btn-error btn-outline">Cancel Booking</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={!!toCancel}
        onClose={() => !busy && setToCancel(null)}
        title="Cancel this booking?"
        actions={
          <>
            <button onClick={() => setToCancel(null)} disabled={busy} className="btn btn-ghost">Keep booking</button>
            <button onClick={cancel} disabled={busy} className="btn btn-error">
              {busy ? <span className="loading loading-spinner loading-sm" /> : "Yes, cancel"}
            </button>
          </>
        }
      >
        <p className="opacity-80">
          Your request for <span className="font-semibold">{toCancel?.studioTitle}</span> on {toCancel && fmtDate(toCancel.date)} will be cancelled.
        </p>
      </Modal>
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookings />
    </PrivateRoute>
  );
}