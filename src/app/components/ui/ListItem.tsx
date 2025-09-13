"use client";
import React from "react";

interface ListItemProps {
  key?: number;
  label: string;
  isChecked?: boolean;
}

export function ListItem({ label, isChecked }: ListItemProps) {
  return (
    <div className="w-full flex items-start gap-1">
      {isChecked ? (
        <img
          src="/icon/checkIcon_default.svg"
          alt="check icon"
          className="pt-1 w-3"
        />
      ) : (
        <img
          src="/icon/crossIcon_default.svg"
          alt="cross icon"
          className="pt-1 w-3"
        />
      )}
      <label className="text-caption">{label}</label>
    </div>
  );
}
