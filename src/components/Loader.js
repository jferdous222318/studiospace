import { TbAperture } from "react-icons/tb";

export default function Loader({ fullPage = false, text = "Loading StudioSpace..." }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${fullPage ? "min-h-[70vh]" : "py-16"}`}>
      <TbAperture className="size-12 text-primary animate-spin" style={{ animationDuration: "1.6s" }} />
      <p className="text-sm opacity-70">{text}</p>
    </div>
  );
}