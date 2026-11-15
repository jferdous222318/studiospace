"use client";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { onImgError } from "@/lib/constants";

export default function StudioCard({ studio }) {
  const rating = Number(studio.rating) || 0;

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition h-full">
      <figure className="relative aspect-[4/3] w-full bg-base-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={studio.image} alt={studio.title} onError={onImgError} className="h-full w-full object-cover" loading="lazy" />
        <span className="badge badge-primary absolute top-3 left-3 font-medium">{studio.category}</span>
        <span className="badge bg-base-100/90 border-0 absolute top-3 right-3 gap-1 font-semibold">
          <FaStar className="text-amber-500" />
          {rating > 0 ? rating.toFixed(1) : "New"}
        </span>
      </figure>

      <div className="card-body p-5 gap-2">
        <h3 className="card-title text-lg line-clamp-1">{studio.title}</h3>
        <p className="flex items-center gap-1 text-sm opacity-70 line-clamp-1">
          <FiMapPin className="shrink-0" /> {studio.location}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <p>
            <span className="text-xl font-extrabold">${studio.hourlyRate}</span>
            <span className="text-sm opacity-70"> / hr</span>
          </p>
          <Link href={`/studios/${studio._id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}