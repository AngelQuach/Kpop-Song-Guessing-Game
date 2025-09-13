"use client";
import React, { useState } from "react";
import { TextLink } from "./TextLink";

interface InputFieldProps {
  title: string;
  hasEncription: boolean;
  fieldValue: string;
  setFieldValue: (value: string) => void;
  onFieldLink?: { label: string; href: string };
  hasError?: boolean;
  resetHasError?: () => void;
  hasHelperText?: boolean;
  underFieldText?: React.ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function InputField({
  title,
  hasEncription = false,
  fieldValue,
  setFieldValue,
  onFieldLink = { label: "", href: "#" },
  hasError = false,
  resetHasError,
  hasHelperText = false,
  underFieldText = "",
  onFocus,
  onBlur,
}: InputFieldProps) {
  const [isPwdShown, setIsPwdShown] = useState<boolean>(false);

  return (
    <div className="flex grow min-w-[325px] flex-col gap-1">
      <div className="w-full flex items-center justify-between">
        <label className="text-body">{title}</label>
        {onFieldLink.label.length > 0 && (
          <TextLink link={onFieldLink} variant="secondary" />
        )}
      </div>
      <div
        className={`w-full flex items-center justify-between gap-2 rounded-md p-2 border-2 ${
          hasError ? "border-error" : "border-tertiary"
        } focus:border-tertiary`}
      >
        <input
          type={hasEncription && !isPwdShown ? "password" : "text"}
          placeholder="Enter"
          value={fieldValue}
          onClick={resetHasError}
          onChange={(e) => setFieldValue(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className="pl-1 text-black focus:outline-none"
        />
        {hasEncription &&
          (isPwdShown ? (
            <button
              onClick={() => setIsPwdShown(false)}
              className="w-6 h-6 bg-[url('/icon/eyeOpenIcon_default.svg')] bg-no-repeat bg-contain hover:bg-[url('/icon/eyeOpenIcon_hover.svg')]"
            />
          ) : (
            <button
              onClick={() => setIsPwdShown(true)}
              className="w-6 h-6 bg-[url('/icon/eyeClosedIcon_default.svg')] bg-no-repeat hover:bg-[url('/icon/eyeClosedIcon_hover.svg')]"
            />
          ))}
      </div>
      <label
        className={`text-caption 
          ${hasError ? "text-error" : "text-secondary-default"} 
          ${!(hasHelperText || hasError) && "hidden"}`}
      >
        {underFieldText}
      </label>
    </div>
  );
}
