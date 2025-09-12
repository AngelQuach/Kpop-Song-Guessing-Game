"use client";

import React, { useState } from "react";
import { Button } from "./components/ui/Button";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function HomePage() {
  // Track active tab
  const [activeTab, setActiveTab] = useState("Home");
  // Track current state
  const [oauthState, setOauthState] = useState<
    "Registering" | "LoggingIn" | null
  >(null);

  return (
    <main className="flex-col gap-2">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentState={oauthState}
        setCurrentState={setOauthState}
      />
      <div className="bg-neutral-200 h-screen text-center">PlaceHolder</div>
      <Footer onTabChange={setActiveTab} />
    </main>
  );
}
