import Link from "next/link";

export const metadata = { title: "Page not found | StudioSpace" };

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <svg viewBox="0 0 240 180" className="w-64 mx-auto" aria-hidden="true">
        <rect x="20" y="150" width="200" height="6" rx="3" fill="currentColor" opacity="0.15" />
        <rect x="60" y="40" width="120" height="80" rx="10" fill="currentColor" opacity="0.1" />
        <circle cx="120" cy="80" r="26" fill="none" stroke="#f59e0b" strokeWidth="8" />
        <circle cx="120" cy="80" r="9" fill="#f59e0b" />
        <path d="M100 120 L80 150 M140 120 L160 150 M120 120 L120 150" stroke="currentColor" strokeWidth="5" opacity="0.4" strokeLinecap="round" />
        <path d="M168 30 l18 -14 M176 44 l24 -4" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <p className="text-7xl font-extrabold text-primary mt-4">404</p>
      <h1 className="text-2xl font-bold mt-2">This shot is out of frame</h1>
      <p className="opacity-70 mt-2 mb-6">The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="btn btn-primary">Return to Home</Link>
    </div>
  );
}