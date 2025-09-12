"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "hollow";
}

const base = "font-semibold px-[20px] py-2 rounded-md text-center font-medium";
type Variant = "primary" | "secondary" | "hollow";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-400 text-white hover:bg-primary-500 dark:bg-primary-300 dark:hover:bg-primary-400",
  secondary:
    "bg-primary-100 text-white hover:bg-primary-150 dark:bg-primary-50 dark:hover:bg-primary-75",
  hollow:
    "bg-neutral-50 border border-primary-100 text-primary-100 hover:bg-neutral-75 dark:bg-neutral-0 dark:border-primary-50 dark:text-primary-50 dark:hover:bg-neutral-50",
};

export function Button({
  variant = "primary",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const classes = [base, variants[variant]].join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
