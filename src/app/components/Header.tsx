"use client";
import React from "react";
import { Button } from "./ui/Button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export const tabs = [
  { label: "Home", href: "/" },
  { label: "Galley", href: "/gallery" },
  { label: "Friends", href: "/friends" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full p-4 bg-white shadow-md flex items-center gap-4">
      <Link href="/">
        <img
          src="/branding/websiteLogo_default.svg"
          alt="IdolEar logo"
          width={120}
        />
      </Link>
      <div className="w-full flex justify-end items-center gap-4">
        <nav className="flex-1 flex items-center gap-2 justify-end">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`text-right text-md text-primary-400 px-2 py-1 rounded-md transition-colors duration-300
                ${
                  pathname === tab.href
                    ? "bg-tertiary font-bold"
                    : "font-semibold"
                }
                hover:bg-tertiary `}
            >
              <label>{tab.label}</label>
            </Link>
          ))}
        </nav>
        <div className="flex gap-4 items-center justify-end">
          {pathname !== "/signIn" && (
            <Button variant="secondary" onClick={() => router.push("/signIn")}>
              Sign in
            </Button>
          )}
          {pathname !== "/register" && (
            <Button variant="primary" onClick={() => router.push("/register")}>
              Register
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
