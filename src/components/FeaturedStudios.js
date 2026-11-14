"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import StudioCard from "./StudioCard";

function CardSkeleton() {
  return (
    <div className="card border border-base-300 h-full">
      <div className="skeleton aspect-[4/3] w-full rounded-b-none" />
      <div className="card-body p-5 gap-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-8 w-full mt-3" />
      </div>
    </div>
  );
}

export default function FeaturedStudios() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/studios?sort=rating&limit=6")
      .then(setStudios)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="section-title">Featured Studios</h2>
          <p className="section-sub">Top-rated and newest spaces, hand-picked for creators.</p>
        </div>
        <Link href="/studios" className="btn btn-outline btn-primary">View all studios</Link>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : error ? (
        <div role="alert" className="alert alert-error alert-soft">{error}</div>
      ) : studios.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-base-300 rounded-box">
          <h3 className="text-xl font-bold">No studios listed yet</h3>
          <p className="opacity-70 mt-1 mb-4">Be the first host on StudioSpace.</p>
          <Link href="/add-studio" className="btn btn-primary">Add a Studio</Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((s) => <StudioCard key={s._id} studio={s} />)}
        </div>
      )}
    </section>
  );
}