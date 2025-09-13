"use client";
import React, { useState, useEffect } from "react";

type Props = {
  fieldVal: string;
  onClick: () => Promise<void> | void;
  coolDown?: number;
  className?: string;
};

export function TimeOutButton({
  fieldVal,
  onClick,
  coolDown = 60,
  className = "",
}: Props) {
  const [left, setLeft] = useState<number>(0); // seconds left
  const disabled = left > 0;

  // Count down seconds
  useEffect(() => {
    if (left <= 0) return;
    const id = setInterval(() => setLeft((s) => (s > 1 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [left]);

  async function handleClick() {
    if (disabled) return;
    try {
      await onClick();
      setLeft(coolDown);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={
        `text-caption inline-block underline transition-colors duration-200 
         ${
           disabled
             ? "text-secondary-default no-underline cursor-not-allowed"
             : "text-primary-100 hover:text-primary-200"
         } ` + className
      }
    >
      {disabled ? `${fieldVal}(${left}s)` : fieldVal}
    </button>
  );
}
