"use client";

import React, { useState } from "react";
import { InputField } from "../components/ui/InputField";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/Button";
import { TextLink } from "../components/ui/TextLink";

export default function HomePage() {
  const router = useRouter();
  const [credential, setCredential] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>(
    "Incorrect verification code"
  );
  const [pwd, setPwd] = useState<string>("");

  const resetHasError = () => {
    setHasError(false);
  };

  async function handleSignIn() {
    // If either field is empty
    if (!credential || credential.length === 0 || !pwd || pwd.length === 0) {
      setHasError(true);
      setErrorMsg("Please ensure all fields are filled");
      return;
    }

    // Search for combination in credentialSet
    const response = await fetch("/api/signIn/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential, pwd }),
    });
    const data = await response.json();

    if (data.ok) {
      // Redirect to success
      sessionStorage.setItem("title", "Welcome");
      sessionStorage.setItem(
        "body",
        "Welcome back to <strong>IdolEar</strong>! Ready to test your K-pop knowledge?"
      );
      sessionStorage.setItem("buttonText", "Start Exploration");
      router.push("/welcome");
    } else {
      // Otherwise, if no combination found
      setHasError(true);
      setErrorMsg("The Email/Username and Password combination is not found.");
    }
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
        <label className="text-h1 font-bold">Sign In</label>
        <form
          className="w-full flex flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
        >
          <div className="w-full flex flex-col gap-4 justify-items-start">
            {/* Email / Username */}
            <InputField
              title="Email / Username"
              hasEncription={false}
              fieldValue={credential}
              setFieldValue={setCredential}
              hasError={hasError}
              resetHasError={resetHasError}
            />

            {/* Password */}
            <InputField
              title="Password"
              hasEncription={true}
              fieldValue={pwd}
              setFieldValue={setPwd}
              onFieldLink={{
                label: "Forgot Password?",
                href: "/resetPassword",
              }}
              hasError={hasError}
              resetHasError={resetHasError}
              underFieldText={errorMsg}
            />
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-2 items-center">
            <Button variant="primary" className="w-full" onClick={handleSignIn}>
              Sign In
            </Button>
            <TextLink
              variant="secondary"
              link={{
                label: "New to IdolEar? Register here",
                href: "/register",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
