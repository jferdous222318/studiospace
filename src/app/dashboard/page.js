"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import StatusBadge from "@/components/StatusBadge";
import Loader from "@/components/Loader";

const fmtDate = (d) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({ studios: [], mine: [], received: [] });
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    Promise.all([api("/studios/mine"), api("/bookings/mine"), api("/bookings/received")])
      .then(([studios, mine, received]) => setData({ studios, mine, received }))
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const setStatus = async (id, status) => {
    setBusyId(id);
    try {
      const res = await api(`/bookings/${id}/status`, { method: "PATCH", body: { status } });
      setData((d) => ({ ...d, received: d.received.map((b) => (b._id === id ? { ...b, status } : b)) }));
      toast.success(res.message);
    } catch (e) {
      toast.error(e.message); // shows the double-booking conflict message
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <Loader fullPage text="Loading dashboard..." />;

  const pending = data.received.filter((b) => b.status === "Pending").length;
  const stats = [
    { label: "My Listings", value: data.studios.length, href: "/my-listings" },
    { label: "My Bookings", value: data.mine.length, href: "/my-bookings" },
    { label: "Pending Requests", value: pending, href: "#requests" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="section-title">Welcome, {user.name}</h1>
      <p className="section-sub mb-8">Here is what is happening on your StudioSpace account.</p>

      <div className="grid gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card bg-base-200 border border-base-300 hover:border-primary transition">
            <div className="card-body p-6">
              <p className="text-sm opacity-70">{s.label}</p>
              <p className="text-4xl font-extrabold text-primary">{s.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <section id="requests" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-4">Booking requests for my studios</h2>
        {data.received.length === 0 ? (
          <div className="text-center py-14 border border-dashed border-base-300 rounded-box">
            <p className="font-semibold">No booking requests yet</p>
            <p className="opacity-70 text-sm mt-1">Requests for your studios will show up here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300">
            <table className="table">
              <thead>
                <tr><th>Studio</th><th>Guest</th><th>When</th><th>Total</th><th>Status</th><th className="text-right">Actions</th></tr>
              </thead>
              <tbody>
                {data.received.map((b) => (
                  <tr key={b._id}>
                    <td className="font-semibold min-w-40">{b.studioTitle}</td>
                    <td>
                      <p>{b.userName}</p>
                      <p className="text-xs opacity-70">{b.userEmail}</p>
                    </td>
                    <td className="whitespace-nowrap">{fmtDate(b.date)}<br /><span className="text-xs opacity-70">{b.startTime} to {b.endTime}</span></td>
                    <td className="font-bold">${b.totalPrice}</td>
                    <td><StatusBadge status={b.status} /></td>
                    <td>
                      <div className="flex justify-end gap-2">
                        {b.status === "Pending" && (
                          <>
                            <button disabled={busyId === b._id} onClick={() => setStatus(b._id, "Confirmed")} className="btn btn-xs btn-success">Confirm</button>
                            <button disabled={busyId === b._id} onClick={() => setStatus(b._id, "Cancelled")} className="btn btn-xs btn-error btn-outline">Decline</button>
                          </>
                        )}
                        {b.status === "Confirmed" && (
                          <>
                            <button disabled={busyId === b._id} onClick={() => setStatus(b._id, "Completed")} className="btn btn-xs btn-info">Complete</button>
                            <button disabled={busyId === b._id} onClick={() => setStatus(b._id, "Cancelled")} className="btn btn-xs btn-error btn-outline">Cancel</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  );
}