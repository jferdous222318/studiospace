export const metadata = { title: "Terms of Service | StudioSpace" };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14 space-y-6">
      <h1 className="section-title">Terms of Service</h1>
      <p className="opacity-80">Last updated: November 2026</p>

      <section>
        <h2 className="text-xl font-bold mb-2">Using StudioSpace</h2>
        <p className="opacity-80">
          StudioSpace connects people who rent creative spaces with the hosts who list them.
          You agree to provide accurate information and to use the platform lawfully.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Bookings</h2>
        <p className="opacity-80">
          A booking request becomes confirmed only when the host accepts it. Hosts may decline or cancel
          requests, and guests may cancel requests that are still pending.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Listings</h2>
        <p className="opacity-80">
          Hosts are responsible for the accuracy of their listings, the safety of their space and the
          equipment they offer.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Contact</h2>
        <p className="opacity-80">Questions about these terms? Email jannatulhritu57@gmail.com.</p>
      </section>
    </div>
  );
}