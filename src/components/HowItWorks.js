import { TbSearch, TbClock, TbBolt, TbSparkles } from "react-icons/tb";

const steps = [
  { Icon: TbSearch, title: "Discover Spaces", text: "Browse verified studios and filter by category, price and location." },
  { Icon: TbClock, title: "Select Shoot Hours", text: "Pick your date and time slot. Pricing is shown upfront, with no surprises." },
  { Icon: TbBolt, title: "Book Instantly", text: "Send your request in seconds and track its status from your dashboard." },
  { Icon: TbSparkles, title: "Create & Produce", text: "Show up, set up and shoot. The space is ready for you." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 py-16 scroll-mt-20">
      <div className="text-center">
        <h2 className="section-title">How Booking Works</h2>
        <p className="section-sub mx-auto">From search to shoot day in four simple steps.</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ Icon, title, text }, i) => (
          <div key={title} className="card bg-base-100 border border-base-300 h-full">
            <div className="card-body items-center text-center gap-3">
              <span className="relative grid place-items-center size-16 rounded-full bg-primary text-primary-content">
                <Icon className="size-8" />
                <span className="absolute -top-1 -right-1 grid place-items-center size-6 rounded-full bg-base-content text-base-100 text-xs font-bold">
                  {i + 1}
                </span>
              </span>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm opacity-70">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}