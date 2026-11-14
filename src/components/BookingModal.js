"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import Modal from "./Modal";

const toMin = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export default function BookingModal({ studio, open, onClose }) {
  const router = useRouter();
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  const [form, setForm] = useState({ date: "", startTime: "", endTime: "", guests: 1, notes: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const hours = form.startTime && form.endTime ? (toMin(form.endTime) - toMin(form.startTime)) / 60 : 0;
  const rent = hours > 0 ? hours * studio.hourlyRate : 0;
  const total = rent + (hours > 0 ? Number(studio.securityDeposit || 0) : 0);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.date || !form.startTime || !form.endTime) return setError("Please choose a date, start time and end time");
    if (hours <= 0) return setError("End time must be after start time");
    if (Number(form.guests) > studio.maxCapacity) return setError(`Max capacity is ${studio.maxCapacity} people`);

    setSubmitting(true);
    try {
      await api("/bookings", { method: "POST", body: { studioId: studio._id, ...form, guests: Number(form.guests) } });
      toast.success("Booking request sent! The host will confirm soon.");
      onClose();
      router.push("/my-bookings");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={`Book ${studio.title}`}>
      <form onSubmit={submit} className="space-y-4">
        {error && <div role="alert" className="alert alert-error alert-soft text-sm py-2">{error}</div>}

        <label className="form-control w-full">
          <span className="label-text mb-1 font-medium">Date</span>
          <input type="date" min={today} value={form.date} onChange={set("date")} className="input input-bordered w-full" />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="form-control">
            <span className="label-text mb-1 font-medium">Start time</span>
            <input type="time" value={form.startTime} onChange={set("startTime")} className="input input-bordered w-full" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1 font-medium">End time</span>
            <input type="time" value={form.endTime} onChange={set("endTime")} className="input input-bordered w-full" />
          </label>
        </div>

        <label className="form-control w-full">
          <span className="label-text mb-1 font-medium">Guests (max {studio.maxCapacity})</span>
          <input type="number" min="1" max={studio.maxCapacity} value={form.guests} onChange={set("guests")} className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1 font-medium">Notes for the host (optional)</span>
          <textarea value={form.notes} onChange={set("notes")} rows={2} placeholder="Equipment you'll bring, type of shoot..." className="textarea textarea-bordered w-full" />
        </label>

        <div className="rounded-box bg-base-200 p-4 text-sm space-y-1">
          <div className="flex justify-between"><span>${studio.hourlyRate} x {hours > 0 ? hours : 0} hr</span><span>${rent}</span></div>
          <div className="flex justify-between"><span>Security deposit</span><span>${studio.securityDeposit || 0}</span></div>
          <div className="flex justify-between font-bold text-base pt-2 border-t border-base-300"><span>Total</span><span>${total}</span></div>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? <span className="loading loading-spinner loading-sm" /> : "Confirm Booking"}
          </button>
        </div>
      </form>
    </Modal>
  );
}