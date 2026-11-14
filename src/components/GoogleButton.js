"use client";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function GoogleButton({ onDone }) {
  const { googleLogin } = useAuth();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId)
    return <p className="text-xs text-error text-center">Google Client ID is missing in .env.local</p>;

  const handleSuccess = async (res) => {
    try {
      await googleLogin(res.credential);
      toast.success("Signed in with Google");
      onDone?.();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => toast.error("Google sign-in was cancelled or failed")}
          theme="outline"
          size="large"
          shape="pill"
          text="continue_with"
        />
      </div>
    </GoogleOAuthProvider>
  );
}