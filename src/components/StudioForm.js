"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { CATEGORIES, AMENITIES } from "@/lib/constants";

const field = "input input-bordered w-full";

export default function StudioForm({ initial = {}, user, onSubmit, submitLabel, submitting }) {
  const [form, setForm] = useState({
    title: initial.title || "",
    category: initial.category || "",
    hourlyRate: initial.hourlyRate ?? "",
    securityDeposit: initial.securityDeposit ?? "",
    maxCapacity: initial.maxCapacity ?? "",
    location: initial.location || "",
    image: initial.image || "",
    galleryText: (initial.gallery || []).join("\n"),
    amenities: initial.amenities || [],
    overview: initial.overview || "",
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleAmenity = (a) =>
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }));

  const uploadImage = async (file) => {
    if (!file) return;
    const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
    if (!key) return toast.error("imgbb key is missing. Paste an image URL instead.");
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be smaller than 5 MB");

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) throw new Error();
      setForm((f) => ({ ...f, image: data.data.url }));
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed. Paste an image URL instead.");
    } finally {
      setUploading(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.category) e.category = "Please choose a category";
    if (!(Number(form.hourlyRate) > 0)) e.hourlyRate = "Enter an hourly rate above 0";
    if (form.securityDeposit !== "" && Number(form.securityDeposit) < 0) e.securityDeposit = "Deposit cannot be negative";
    if (!(Number(form.maxCapacity) > 0)) e.maxCapacity = "Enter a capacity above 0";
    if (!form.location.trim()) e.location = "Location is required";
    if (!/^https?:\/\//i.test(form.image.trim())) e.image = "Provide a valid image URL or upload a file";
    if (form.overview.trim().length < 20) e.overview = "Overview must be at least 20 characters";
    setErrors(e);
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) return toast.error(Object.values(e)[0]);

    const gallery = form.galleryText
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => /^https?:\/\//i.test(s));

    onSubmit({
      title: form.title.trim(),
      category: form.category,
      hourlyRate: Number(form.hourlyRate),
      securityDeposit: Number(form.securityDeposit || 0),
      maxCapacity: Number(form.maxCapacity),
      location: form.location.trim(),
      image: form.image.trim(),
      gallery,
      amenities: form.amenities,
      overview: form.overview.trim(),
    });
  };

  const Err = ({ k }) => (errors[k] ? <span className="text-error text-xs mt-1">{errors[k]}</span> : null);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="form-control sm:col-span-2">
          <span className="label-text mb-1 font-medium">Title</span>
          <input value={form.title} onChange={set("title")} placeholder="e.g. Aperture Loft" className={`${field} ${errors.title ? "input-error" : ""}`} />
          <Err k="title" />
        </label>

        <label className="form-control">
          <span className="label-text mb-1 font-medium">Category</span>
          <select value={form.category} onChange={set("category")} className={`select select-bordered w-full ${errors.category ? "select-error" : ""}`}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.value}</option>)}
          </select>
          <Err k="category" />
        </label>

        <label className="form-control">
          <span className="label-text mb-1 font-medium">Location / Address</span>
          <input value={form.location} onChange={set("location")} placeholder="Gulshan 2, Dhaka" className={`${field} ${errors.location ? "input-error" : ""}`} />
          <Err k="location" />
        </label>

        <label className="form-control">
          <span className="label-text mb-1 font-medium">Hourly Rate ($)</span>
          <input type="number" min="1" value={form.hourlyRate} onChange={set("hourlyRate")} className={`${field} ${errors.hourlyRate ? "input-error" : ""}`} />
          <Err k="hourlyRate" />
        </label>

        <label className="form-control">
          <span className="label-text mb-1 font-medium">Security Deposit ($)</span>
          <input type="number" min="0" value={form.securityDeposit} onChange={set("securityDeposit")} className={`${field} ${errors.securityDeposit ? "input-error" : ""}`} />
          <Err k="securityDeposit" />
        </label>

        <label className="form-control">
          <span className="label-text mb-1 font-medium">Max Capacity (people)</span>
          <input type="number" min="1" value={form.maxCapacity} onChange={set("maxCapacity")} className={`${field} ${errors.maxCapacity ? "input-error" : ""}`} />
          <Err k="maxCapacity" />
        </label>
      </div>

      <div className="form-control">
        <span className="label-text mb-1 font-medium">Main Image</span>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input value={form.image} onChange={set("image")} placeholder="https://i.ibb.co/.../photo.jpg" className={`${field} ${errors.image ? "input-error" : ""}`} />
          <label className={`btn btn-outline shrink-0 ${uploading ? "btn-disabled" : ""}`}>
            {uploading ? <span className="loading loading-spinner loading-sm" /> : "Upload file"}
            <input type="file" accept="image/*" hidden onChange={(e) => uploadImage(e.target.files?.[0])} />
          </label>
        </div>
        <Err k="image" />
        {/^https?:\/\//i.test(form.image) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.image} alt="Preview" className="mt-3 h-40 w-64 max-w-full rounded-box object-cover border border-base-300" />
        )}
      </div>

      <label className="form-control">
        <span className="label-text mb-1 font-medium">Gallery image URLs (optional, one per line)</span>
        <textarea value={form.galleryText} onChange={set("galleryText")} rows={3} placeholder="https://..." className="textarea textarea-bordered w-full" />
      </label>

      <div>
        <span className="label-text mb-2 block font-medium">Amenities</span>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {AMENITIES.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={form.amenities.includes(a)} onChange={() => toggleAmenity(a)} />
              {a}
            </label>
          ))}
        </div>
      </div>

      <label className="form-control">
        <span className="label-text mb-1 font-medium">Detailed Overview</span>
        <textarea value={form.overview} onChange={set("overview")} rows={5} placeholder="Describe the space, lighting, equipment, house rules..." className={`textarea textarea-bordered w-full ${errors.overview ? "textarea-error" : ""}`} />
        <Err k="overview" />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="form-control">
          <span className="label-text mb-1 font-medium">Host Name</span>
          <input value={user?.name || ""} readOnly className={`${field} bg-base-200 cursor-not-allowed`} />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 font-medium">Host Email</span>
          <input value={user?.email || ""} readOnly className={`${field} bg-base-200 cursor-not-allowed`} />
        </label>
      </div>

      <button type="submit" disabled={submitting || uploading} className="btn btn-primary w-full sm:w-auto sm:px-10">
        {submitting ? <span className="loading loading-spinner loading-sm" /> : submitLabel}
      </button>
    </form>
  );
}
