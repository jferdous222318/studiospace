"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { api } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import StudioCard from "@/components/StudioCard";
import CardSkeleton from "@/components/CardSkeleton";

function Explore() {
  const params = useSearchParams();
  const router = useRouter();

  const category = params.get("category") || "All";
  const sort = params.get("sort") || "newest";
  const search = params.get("search") || "";

  const [searchText, setSearchText] = useState(search);
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    const q = new URLSearchParams();
    if (category !== "All") q.set("category", category);
    if (search) q.set("search", search);
    q.set("sort", sort);

    api(`/studios?${q}`)
      .then((d) => !cancelled && setStudios(d))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [category, sort, search]);

  const setParam = (key, value) => {
    const p = new URLSearchParams(params.toString());
    if (!value || value === "All" || (key === "sort" && value === "newest")) p.delete(key);
    else p.set(key, value);
    const qs = p.toString();
    router.replace(qs ? `/studios?${qs}` : "/studios");
  };

  const clearAll = () => {
    setSearchText("");
    router.replace("/studios");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="section-title">Explore Studios</h1>
      <p className="section-sub">Find the right space by category, location or budget.</p>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <form
          onSubmit={(e) => { e.preventDefault(); setParam("search", searchText.trim()); }}
          className="join w-full lg:max-w-md"
        >
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name or location"
            className="input input-bordered join-item w-full"
          />
          <button className="btn btn-primary join-item" aria-label="Search"><FiSearch /></button>
        </form>

        <select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value)}
          className="select select-bordered w-full lg:w-56"
          aria-label="Sort studios"
        >
          <option value="newest">Newest first</option>
          <option value="rating">Top rated</option>
          <option value="priceLow">Price: low to high</option>
          <option value="priceHigh">Price: high to low</option>
        </select>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {[{ value: "All", label: "All" }, ...CATEGORIES].map((c) => (
          <button
            key={c.value}
            onClick={() => setParam("category", c.value)}
            className={`btn btn-sm ${category === c.value ? "btn-primary" : "btn-outline"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div role="alert" className="alert alert-error alert-soft">{error}</div>
        ) : studios.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-base-300 rounded-box">
            <h3 className="text-xl font-bold">No studios match your search</h3>
            <p className="opacity-70 mt-1 mb-5">Try a different keyword or category.</p>
            <div className="flex justify-center gap-3">
              <button onClick={clearAll} className="btn btn-primary">Clear filters</button>
              <Link href="/add-studio" className="btn btn-outline">Host a space</Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm opacity-70 mb-4">{studios.length} studio{studios.length > 1 ? "s" : ""} found</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((s) => <StudioCard key={s._id} studio={s} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-10"><div className="skeleton h-96 w-full" /></div>}>
      <Explore />
    </Suspense>
  );
}