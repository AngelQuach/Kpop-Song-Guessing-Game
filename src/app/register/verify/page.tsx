"use client";

import React, { useRef, useState, useEffect } from "react";
import { InputField } from "../../components/ui/InputField";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/Button";
import { TimeOutButton } from "../../components/ui/TimeOutButton";

export default function VerifyPage() {
  const router = useRouter();

  // form values
  const [email, setEmail] = useState<string>("");
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const hasRunRef = useRef(false);

  // Get the stored email
  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const pendingEmail = sessionStorage.getItem("pendingEmail") ?? "";

    if (pendingEmail.length > 0) {
      setEmail(pendingEmail);

      // Send a verification email
      (async () => {
        try {
          await handleResendCode(pendingEmail);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, []);

  // Check Verification Code
  async function handleVerify() {
    // Check if code is entered
    if (verifyCode.length < 6) {
      setSubmitError("Incorrect verification code. Please try again.");
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
      setSubmitError("Incorrect verification code. Please try again.");
      console.error(data.reason);
    } else {
      // If match, redirect to success page
      setSubmitError("");

      sessionStorage.setItem("title", "Successful Registration");
      sessionStorage.setItem(
        "body",
        "Welcome to <strong>IdolEar</strong>! Ready to test your K-pop knowledge?"
      );
      sessionStorage.setItem("buttonText", "Start Exploration");
      router.push("/welcome");
    }
  }

  async function handleResendCode(emailToSend: string) {
    // Send random code to email
    await fetch("/api/register/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailToSend }),
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

      {/* Right: Form */}
      <div className="w-full flex flex-col min-w-[405px] gap-8 text-primary-400 px-10 py-20 items-center justify-center h-full">
        <label className="text-h1 font-bold">Register</label>
        <form
          className="w-full flex flex-col gap-8"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleVerify();
          }}
        >
          <div className="w-full flex flex-col gap-4 justify-items-start">
            {/* Verification Code */}
            <div className="w-full flex flex-col gap-1 justify-items-start">
              <div className="w-full flex items-center justify-between">
                <label className="text-body">Verification Code</label>
                <TimeOutButton
                  fieldVal="Resend Code"
                  onClick={async () => {
                    setSubmitError("");
                    await handleResendCode(email);
                  }}
                />
              </div>
              <InputField
                hasTitle={false}
                hasEncription={false}
                fieldValue={verifyCode}
                numberOnly={true}
                maxLength={6}
                setFieldValue={(v: string) => setVerifyCode(v)}
                onFieldLink={{ label: "Resend Code", href: "" }}
                hasHelperText={true}
                underFieldText={
                  <label className="text-caption text-secondary-default">
                    We've sent a code (6-digit) to <strong>{email}.</strong>
                  </label>
                }
                hasError={!!submitError}
                resetHasError={() => setSubmitError("")}
                onFocus={() => setSubmitError("")}
              />
              {/* Error Msg */}
              {!!submitError && (
                <label className="text-caption text-error">{submitError}</label>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-2 items-center">
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              onClick={handleVerify}
            >
              Verify Code
            </Button>
            <Button
              type="submit"
              variant="hollow"
              className="w-full"
              onClick={() => router.back()}
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
