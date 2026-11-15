export const metadata = { title: "Privacy Policy | StudioSpace" };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14 space-y-6">
      <h1 className="section-title">Privacy Policy</h1>
      <p className="opacity-80">Last updated: November 2026</p>

      <section>
        <h2 className="text-xl font-bold mb-2">What we collect</h2>
        <p className="opacity-80">
          When you register or sign in with Google, we store your name, email address and profile photo.
          When you book or list a studio, we store the booking and listing details you provide.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">How we use it</h2>
        <p className="opacity-80">
          Your information is used only to run your StudioSpace account, show your bookings and listings,
          and let hosts and guests contact each other about a booking. We do not sell your data.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Security</h2>
        <p className="opacity-80">
          Passwords are stored as secure hashes. Your login session is kept in an HTTP-only cookie.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Contact</h2>
        <p className="opacity-80">Questions about your data? Email jannatulhritu57@gmail.com.</p>
      </section>
    </div>
  );
}