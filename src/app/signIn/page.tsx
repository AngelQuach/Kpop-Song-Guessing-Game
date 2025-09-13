"use client";

import React, { useState } from "react";
import { InputField } from "../components/ui/InputField";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/Button";
import { TextLink } from "../components/ui/TextLink";

/** DEBUG purpose */
const credentialSet = [
  { credential: "tropicalFruits123", pwd: "12345678" },
  { credential: "appleU@gmail.com", pwd: "12345678A" },
];

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
    if (credential.length === 0 || pwd.length === 0) {
      setHasError(true);
      setErrorMsg("Please ensure all fields are filled");
      return;
    }

    // Search for combination in credentialSet
    const response = await fetch("/api/signIn/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: credential, pwd: pwd }),
    });
    const data = await response.json();

    if (data.ok) {
      // Redirect to homepage
      router.push("/");
    } else {
      // Otherwise, if no combination found
      setHasError(true);
      setErrorMsg("The Email/Username and Password combination is not found.");
    }
  }

  return (
    <div className="grid grid-cols-2 items-center gap-4 px-10 py-10 md:h-svh">
      <div className="flex items-center justify-center h-full">
        <img
          src="/branding/websiteLogo_default.svg"
          alt="IdolEar logo"
          className="w-full max-w-[90%] h-auto object-contain"
        />
      </div>
      <div className="flex flex-col min-w-[405px] gap-8 text-primary-400 px-10 py-20 items-center justify-center h-full">
        <label className="text-h1 font-bold">Sign In</label>
        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-col gap-4 justify-items-start">
            <InputField
              title="Email / Username"
              hasEncription={false}
              fieldValue={credential}
              setFieldValue={setCredential}
              hasError={hasError}
              resetHasError={resetHasError}
            />
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
        </div>
      </div>
    </div>
  );
}
