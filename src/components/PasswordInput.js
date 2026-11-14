"use client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordInput({ name = "password", placeholder = "Your password", invalid }) {
  const [show, setShow] = useState(false);
  return (
    <label className={`input input-bordered flex items-center gap-2 w-full ${invalid ? "input-error" : ""}`}>
      <input
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="grow"
        autoComplete={name === "password" ? "current-password" : "off"}
      />
      <button type="button" onClick={() => setShow((s) => !s)} aria-label="Toggle password visibility" className="opacity-60 hover:opacity-100">
        {show ? <FiEyeOff /> : <FiEye />}
      </button>
    </label>
  );
}