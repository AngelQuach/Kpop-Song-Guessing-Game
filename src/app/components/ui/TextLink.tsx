"use client";
import React from "react";
import Link from "next/link";

interface TextLinkProps {
  key?: string;
  link: {
    label: string;
    href: string;
  };
  variant?: "default" | "secondary";
}

const base = "text-caption inline-block";
type Variant = "default" | "secondary";

const variants: Record<Variant, string> = {
  default:
    "relative text-white pr-1 py-1 after:absolute after:left-0 after:-bottom-0.25 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100",
  secondary:
    "underline text-primary-100 hover:text-primary-200 transition-colors duration-200",
};

export function TextLink({ link, variant = "default" }: TextLinkProps) {
  const classes = [base, variants[variant]].join(" ");

  return (
    <Link href={link.href} className={classes}>
      {link.label}
    </Link>
  );
}
