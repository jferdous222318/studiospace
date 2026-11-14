import Link from "next/link";

export const metadata = { title: "About Us | StudioSpace" };

const values = [
  { title: "Creators first", text: "Every feature exists to help creators find the right space faster and with fewer surprises." },
  { title: "Fair for hosts", text: "Hosts set their own rates and rules. We handle discovery, scheduling and trust." },
  { title: "Transparent pricing", text: "You see the hourly rate, the deposit and the total before you book." },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="section-title">About StudioSpace</h1>
      <p className="section-sub">
        StudioSpace is a peer-to-peer marketplace where photographers, filmmakers, podcasters and musicians
        rent creative spaces by the hour from verified hosts.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="card bg-base-200 border border-base-300 h-full">
            <div className="card-body">
              <h2 className="font-bold text-lg">{v.title}</h2>
              <p className="text-sm opacity-70">{v.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/studios" className="btn btn-primary">Explore Studios</Link>
      </div>
    </div>
  );
}