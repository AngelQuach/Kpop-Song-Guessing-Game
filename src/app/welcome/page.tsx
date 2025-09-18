"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/Button";

export default function WelcomePage() {
  const router = useRouter();

  const title = sessionStorage.getItem("title") ?? "Unexpected Error!";
  const body =
    sessionStorage.getItem("body") ??
    "Oopsy! Some unexpected error occurs. Please try again.";
  const buttonText = sessionStorage.getItem("buttonText") ?? "";

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
            {title}
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
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </label>

          {/* Actions */}
          {buttonText.length > 0 && (
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              onClick={() => router.push("/")}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
