"use client";
import React from "react";
import Link from "next/link";
import { TextLink } from "./ui/TextLink";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const legal = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  return (
    <div className="w-full px-4 py-6 bg-primary-400 shadow-md flex flex-col items-start gap-8 rounded-t-xl">
      <div className="w-full flex items-start gap-4">
        <div className="flex flex-col items-start gap-2">
          <Link href="/">
            <img
              src="/branding/websiteLogo_white.svg"
              alt="IdolEar logo"
              width={145}
            />
          </Link>
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
            <nav className="flex flex-col items-start gap-1">
              {company.map((link) => (
                <TextLink key={link.label} link={link} />
              ))}
            </nav>
          </div>
          <div className="flex flex-col items-start gap-4">
            <label className="text-lg text-white font-semibold">Legal</label>
            <nav className="flex flex-col items-start gap-2">
              {legal.map((link) => (
                <TextLink key={link.label} link={link} />
              ))}
            </nav>
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
