"use client";
import React from "react";
import Link from "next/link";

interface TextLinkProps {
  key?: string;
  link: {
    label: string;
    href: string;
  };
}

export function TextLink({ key, link }: TextLinkProps) {
  return (
    <Link
      href={link.href}
      className="relative text-md text-white pr-2 py-1 inline-block
             after:absolute after:left-0 after:-bottom-0.25 after:h-[2px] after:w-full
             after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300
             hover:after:scale-x-100"
    >
      {link.label}
    </Link>
  );
}
