import Link from "next/link";
import { TbAperture } from "react-icons/tb";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
      <TbAperture className="size-8 text-primary" />
      <span>Studio<span className="text-primary">Space</span></span>
    </Link>
  );
}