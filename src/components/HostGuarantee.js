import { TbShieldCheck, TbUserCheck, TbSettings, TbHeadset } from "react-icons/tb";

const items = [
  { Icon: TbShieldCheck, title: "Liability Protection", text: "Every booking is covered, so hosts and creators can work with confidence." },
  { Icon: TbUserCheck, title: "Verified Profiles", text: "Hosts and guests are identity-checked before their first booking." },
  { Icon: TbSettings, title: "Equipment Safety", text: "Gear and rigging are checked against our safety standards." },
  { Icon: TbHeadset, title: "24/7 Host Support", text: "A real person is always available to help when something comes up." },
];

export default function HostGuarantee() {
  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title">Host Guarantee & Creator Support</h2>
        <p className="section-sub">Book and host knowing the platform has your back.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, title, text }) => (
            <div key={title} className="card bg-base-100 border border-base-300 h-full">
              <div className="card-body gap-3">
                <Icon className="size-9 text-primary" />
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm opacity-70">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}