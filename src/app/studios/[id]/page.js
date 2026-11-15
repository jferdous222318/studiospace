"use client";
import { onImgError } from "@/lib/constants";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa6";
import { FiMapPin, FiUsers, FiCheckCircle } from "react-icons/fi";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";
import Loader from "@/components/Loader";

export default function StudioDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api(`/studios/${id}`)
      .then(setStudio)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader fullPage text="Loading studio..." />;

  if (notFound || !studio)
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="section-title">Studio not found</h1>
        <p className="section-sub mx-auto mb-6">This listing may have been removed.</p>
        <Link href="/studios" className="btn btn-primary">Back to Explore</Link>
      </div>
    );

  const images = [studio.image, ...(studio.gallery || [])].filter(Boolean);
  const isOwner = user?.email === studio.ownerEmail;
  const rating = Number(studio.rating) || 0;

  const handleBook = () => {
    if (!user) {
      toast.error("Please log in to book this studio");
      router.push(`/login?redirect=${encodeURIComponent(`/studios/${id}`)}`);
      return;
    }
    setOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop={images.length > 1}
            className="w-full aspect-[16/9] rounded-box bg-base-300"
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${studio.title} photo ${i + 1}`} onError={onImgError} className="h-full w-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge badge-primary">{studio.category}</span>
              <span className="flex items-center gap-1 text-sm font-semibold">
                <FaStar className="text-amber-500" /> {rating > 0 ? rating.toFixed(1) : "New"}
                <span className="opacity-60 font-normal">({studio.reviews?.length || 0} reviews)</span>
              </span>
            </div>
            <h1 className="section-title mt-3">{studio.title}</h1>
            <div className="mt-3 flex flex-wrap gap-5 text-sm opacity-80">
              <span className="flex items-center gap-1"><FiMapPin /> {studio.location}</span>
              <span className="flex items-center gap-1"><FiUsers /> Up to {studio.maxCapacity} people</span>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold mb-2">Overview</h2>
            <p className="opacity-80 leading-relaxed whitespace-pre-line">{studio.overview}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Amenities</h2>
            {studio.amenities?.length ? (
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {studio.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm">
                    <FiCheckCircle className="text-primary shrink-0" /> {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="opacity-70 text-sm">The host has not listed amenities yet.</p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Reviews</h2>
            {studio.reviews?.length ? (
              <div className="space-y-4">
                {studio.reviews.map((r, i) => (
                  <div key={i} className="rounded-box border border-base-300 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{r.name}</p>
                      <p className="flex items-center gap-1 text-sm"><FaStar className="text-amber-500" /> {r.rating}</p>
                    </div>
                    <p className="text-sm opacity-80 mt-1">{r.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="opacity-70 text-sm">No reviews yet. Be the first to book and share your experience.</p>
            )}
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit space-y-4">
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body gap-3">
              <p>
                <span className="text-3xl font-extrabold">${studio.hourlyRate}</span>
                <span className="opacity-70"> / hr</span>
              </p>
              <p className="text-sm opacity-80">Security deposit: ${studio.securityDeposit || 0}</p>

              {isOwner ? (
                <>
                  <button disabled className="btn btn-primary w-full">Book Workspace Now</button>
                  <p className="text-xs opacity-70 text-center">This is your own listing.</p>
                  <Link href={`/studios/edit/${studio._id}`} className="btn btn-outline w-full">Edit Listing</Link>
                </>
              ) : (
                <button onClick={handleBook} className="btn btn-primary w-full">Book Workspace Now</button>
              )}
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body gap-3">
              <h3 className="font-bold">Hosted by</h3>
              <div className="flex items-center gap-3">
                <span className="grid place-items-center size-12 rounded-full bg-primary text-primary-content font-bold">
                  {studio.ownerName?.[0]?.toUpperCase()}
                </span>
                <div>
                  <p className="font-semibold">{studio.ownerName}</p>
                  <p className="text-xs opacity-70">{studio.ownerEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <BookingModal key={open ? "open" : "closed"} studio={studio} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}