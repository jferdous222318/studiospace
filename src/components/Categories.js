import Link from "next/link";
import { TbCamera, TbMovie, TbMicrophone, TbMusic, TbPalette } from "react-icons/tb";
import { CATEGORIES } from "@/lib/constants";

const icons = {
  "Photo Studio": TbCamera,
  "Film Stage": TbMovie,
  "Podcast Lounge": TbMicrophone,
  "Music Suite": TbMusic,
  "Art Workshop": TbPalette,
};

export default function Categories() {
  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title">Browse by Category</h2>
        <p className="section-sub">Pick the kind of space your project needs.</p>

        <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => {
            const Icon = icons[c.value];
            return (
              <Link
                key={c.value}
                href={`/studios?category=${encodeURIComponent(c.value)}`}
                className="card bg-base-100 border border-base-300 hover:border-primary hover:shadow-lg hover:-translate-y-1 transition h-full"
              >
                <div className="card-body items-center text-center gap-3 p-6">
                  <span className="grid place-items-center size-14 rounded-full bg-primary/15 text-primary">
                    <Icon className="size-7" />
                  </span>
                  <h3 className="font-bold">{c.label}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}