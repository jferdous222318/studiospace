"use client";
import { useEffect } from "react";

export default function Modal({ open, onClose, title, children, actions, wide }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true" onClick={onClose}>
      <div className={`modal-box ${wide ? "max-w-2xl" : ""}`} onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-xl">{title}</h3>
        <div className="py-4">{children}</div>
        {actions && <div className="modal-action mt-0">{actions}</div>}
      </div>
    </div>
  );
}