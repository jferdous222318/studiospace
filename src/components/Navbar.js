"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

const closeMenu = () => document.activeElement?.blur();

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href) => !href.includes("#") && pathname === href;

  const handleLogout = async () => {
    closeMenu();
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const navItems = links.map((l) => (
    <li key={l.href}>
      <Link
        href={l.href}
        onClick={closeMenu}
        className={isActive(l.href) ? "text-primary font-semibold border-b-2 border-primary rounded-none" : ""}
      >
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start gap-1">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Open menu">
              <FiMenu className="size-5" />
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow-lg border border-base-300">
              {navItems}
            </ul>
          </div>
          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{navItems}</ul>
        </div>

        <div className="navbar-end gap-1">
          <ThemeToggle />

          {loading ? (
            <div className="skeleton size-10 rounded-full" />
          ) : user ? (
            <div className="dropdown dropdown-end dropdown-hover">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center bg-primary text-primary-content font-bold">
                  {user.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.photoURL} alt={user.name} referrerPolicy="no-referrer" />
                  ) : (
                    <span>{user.name?.[0]?.toUpperCase()}</span>
                  )}
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 mt-1 w-60 p-2 shadow-lg border border-base-300">
                <li className="menu-title px-3 py-2">
                  <span className="font-bold text-base-content">{user.name}</span>
                  <span className="text-xs font-normal normal-case">{user.email}</span>
                </li>
                <li><Link href="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
                <li><Link href="/add-studio" onClick={closeMenu}>Add New Studio</Link></li>
                <li><Link href="/my-listings" onClick={closeMenu}>My Studio Listings</Link></li>
                <li><Link href="/my-bookings" onClick={closeMenu}>My Bookings</Link></li>
                <li><button onClick={handleLogout} className="text-error">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm sm:btn-md">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm sm:btn-md">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}