"use client";
import React from "react";

interface FooterProps {
  onTabChange: (tab: string) => void;
}

export function Footer({ onTabChange }: FooterProps) {
  // Arr of tabs in header
  const company: string[] = ["About Us", "Contact"];
  const legal: string[] = ["Terms & Conditions", "Privacy Policy"];

  return (
    <div className="w-full px-4 py-6 bg-primary-400 shadow-md flex flex-col items-start gap-8 rounded-t-xl">
      <div className="w-full flex items-start gap-4">
        <div className="flex flex-col items-start gap-2">
          <img
            src="/branding/websiteLogo_white.svg"
            alt="IdolEar logo"
            width={145}
            height={30}
          />
          <div className="pl-2 flex-1 flex items-center gap-2">
            <img
              src="/branding/xLogo_white.svg"
              alt="Twitter logo"
              width={25}
              height={25}
            />
            <img
              src="/branding/instagramLogo_white.svg"
              alt="Instagram logo"
              width={25}
              height={25}
            />
          </div>
        </div>
        <div className="w-full pr-4 flex justify-end items-center gap-20">
          <div className="flex flex-col items-start gap-4">
            <label className="text-lg text-white font-semibold">Company</label>
            <div className="flex flex-col items-start gap-1">
              {company.map((link) => (
                <div
                  key={link}
                  className="text-md text-white hover:underline pr-2 py-1"
                  onClick={() => onTabChange(link)}
                >
                  <label>{link}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <label className="text-lg text-white font-semibold">Legal</label>
            <div className="flex flex-col items-start gap-1">
              {legal.map((link) => (
                <div
                  key={link}
                  className="text-md text-white hover:underline pr-2 py-1"
                  onClick={() => onTabChange(link)}
                >
                  <label>{link}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center gap-8">
        <label className="text-white">
          @ 2025 IdolEar. All rights reserved.
        </label>
        <div className="flex-1 border-1 border-white" />
      </div>
    </div>
  );
}
