"use client";
import React from "react";
import { Button } from "./ui/Button";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentState: string | null;
  setCurrentState: (state: "Registering" | "LoggingIn" | null) => void;
}

export function Header({
  activeTab,
  onTabChange,
  currentState,
  setCurrentState,
}: HeaderProps) {
  // Arr of tabs in header
  const tabs: string[] = ["Home", "Galley", "Friends", "Contact"];

  return (
    <div className="w-full p-4 bg-white shadow-md flex items-center gap-4">
      <img
        src="/branding/websiteLogo_default.svg"
        alt="IdolEar logo"
        width={120}
        height={30}
      />
      <div className="w-full flex justify-end items-center gap-4">
        <div className="flex-1 flex items-center gap-2 justify-end">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`text-right text-md text-primary-400 hover:bg-tertiary px-2 py-1 rounded-md ${
                activeTab === tab ? "bg-tertiary font-bold" : "font-semibold"
              }`}
              onClick={() => onTabChange(tab)}
            >
              <label>{tab}</label>
            </div>
          ))}
        </div>
        <div className="flex gap-4 items-center justify-end">
          <Button variant="secondary">Sign in</Button>
          <Button variant="primary">Register</Button>
        </div>
      </div>
    </div>
  );
}
