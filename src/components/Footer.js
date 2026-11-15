"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import { CATEGORIES } from "@/lib/constants";
import Logo from "./Logo";

export default function Footer() {
  const subscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!email) return toast.error("Please enter your email address");
    toast.success("You're subscribed to StudioSpace updates!");
    e.target.reset();
  };

  const socials = [
    { Icon: FaXTwitter, label: "X", href: "https://x.com" },
    { Icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
    { Icon: FaYoutube, label: "YouTube", href: "https://youtube.com" },
    { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-base-200 border-t border-base-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm opacity-70">
            Our mission is to make every creative space accessible, so ideas can move from
            imagination to production without barriers.
          </p>
          <div className="flex gap-2">
            {socials.map(({ Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="btn btn-circle btn-sm btn-outline">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="footer-title mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="link link-hover" href="/">Home</Link></li>
            <li><Link className="link link-hover" href="/studios">Explore Studios</Link></li>
            <li><Link className="link link-hover" href="/#how-it-works">How It Works</Link></li>
            <li><Link className="link link-hover" href="/about">About Us</Link></li>
            <li><Link className="link link-hover" href="/add-studio">Host Your Space</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="footer-title mb-3">Popular Categories</h3>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.value}>
                <Link className="link link-hover" href={`/studios?category=${encodeURIComponent(c.value)}`}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-title mb-3">Newsletter</h3>
          <p className="text-sm opacity-70 mb-3">New studios and creator tips, once a month.</p>
          <form onSubmit={subscribe} className="join w-full">
            <input name="email" type="email" placeholder="you@email.com" className="input input-bordered join-item w-full" />
            <button className="btn btn-primary join-item">Join</button>
          </form>
        </div>
      </div>

      <div className="border-t border-base-300 py-4 text-center text-xs opacity-70 px-4">
        © {new Date().getFullYear()} StudioSpace. All rights reserved. By using this site you agree to our{" "}
        <Link href="/terms" className="link">Terms of Service</Link> and{" "}
        <Link href="/privacy" className="link">Privacy Policy</Link>.
      </div>
    </footer>
  );
}