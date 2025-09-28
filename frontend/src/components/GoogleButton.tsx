import React, { useEffect } from "react";
import { socialLogin } from "../api/user";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window { google?: any; }
}

interface Props {
  text?: string;
  onSuccessRedirect?: string; // e.g. "/profile" or "/login"
}

export default function GoogleButton({ text = "Continue with Google", onSuccessRedirect = "/profile" }: Props) {
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

  useEffect(() => {
    // load Google's script if not already loaded
    const existing = document.getElementById("gsi-script");
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = "gsi-script";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = initialize;
    } else {
      initialize();
    }

    function initialize() {
      if (!window.google || !clientId) {
        console.error("Google SDK not available or clientId missing");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });

      // render button in the container
      const container = document.getElementById("google-signin-button");
      if (container) {
        window.google.accounts.id.renderButton(container, {
          theme: "outline",
          size: "large",
          width: "250",
        });
      }
      // optional: show one-tap as well: window.google.accounts.id.prompt();
    }

    async function handleCredentialResponse(response: any) {
      const idToken = response?.credential;
      if (!idToken) {
        console.error("No credential returned by Google:", response);
        return;
      }
      try {
        const tokens = await socialLogin(idToken);
        localStorage.setItem("access_token", tokens.access);
        localStorage.setItem("refresh_token", tokens.refresh);
        navigate(onSuccessRedirect);
      } catch (err) {
        console.error("Social login failed:", err);
        alert("Google login failed");
      }
    }
  }, [navigate, clientId, onSuccessRedirect]);

  return <div id="google-signin-button" aria-label={text} />;
}
