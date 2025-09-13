"use client";

import React, { useState, useEffect } from "react";
import { InputField } from "../../components/ui/InputField";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/Button";
import { TimeOutButton } from "../../components/ui/TimeOutButton";

export default function VerifyPage() {
  const router = useRouter();

  // form values
  const [email, setEmail] = useState<string>("");
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const [submitError, setSubmitError] = useState<string>("");

  // Get the stored email
  useEffect(() => {
    const pendingEmail = sessionStorage.getItem("pendingEmail") ?? "";
    setEmail(pendingEmail);
  }, []);
  // Send a code for any new email
  useEffect(() => {
    if (!email) return;

    // Send a verification email
    (async () => {
      try {
        await handleResendCode();
      } catch (e) {
        console.error(e);
      }
    })();
  }, [email]);

  // Check Verification Code
  async function handleVerify() {
    // Check if code is entered
    if (verifyCode.length < 6) {
      setSubmitError("Incorrect verification code");
      return;
    }
    // Check if code is the same
    const response = await fetch("/api/register/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, verifyCode }),
    });
    const data = await response.json();
    if (!data.ok) {
      setSubmitError("Incorrect verification code");
      console.error(data.reason);
    } else {
      // Otherwise, redirect to homepage
      setSubmitError("");
      router.push("/");
    }
  }

  async function handleResendCode() {
    // Send random code to email
    await fetch("/api/register/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  }

  return (
    <div className="grid grid-cols-2 items-center gap-4 px-10 py-10 md:h-svh">
      {/* Left: Logo */}
      <div className="flex items-center justify-center h-full">
        <img
          src="/branding/websiteLogo_default.svg"
          alt="IdolEar logo"
          className="w-full max-w-[90%] h-auto object-contain"
        />
      </div>

      {/* Right: Main Content */}
      <div className="w-full flex flex-col min-w-[405px] gap-8 text-primary-400 px-10 py-20 items-center justify-center h-full">
        <div className="w-full flex items-center justify-center gap-2 px-8">
          <label className="flex-1 text-h1 font-bold text-center">
            Successful Registration
          </label>
          <img
            src="/icon/confettiIcon.svg"
            alt="confetti icon"
            className="w-15 h-auto object-contain"
          />
        </div>
        <div className="w-full flex flex-col gap-8">
          {/* Text Body */}
          <label className="w-full text-body text-black text-center">
            Welcome to <strong>IdolEar</strong>! Ready to test your K-pop
            knowledge?
          </label>

          {/* Actions */}
          <div className="w-full flex flex-col gap-2 items-center">
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              onClick={() => router.push("/")}
            >
              Start Exploration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
