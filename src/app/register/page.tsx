"use client";

import React, { useState, useEffect, useMemo } from "react";
import { InputField } from "../components/ui/InputField";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/Button";
import { TextLink } from "../components/ui/TextLink";
import { ListItem } from "../components/ui/ListItem";

/** DEBUG purpose */
const credentialSet = [
  { credential: "tropicalFruits123", pwd: "12345678" },
  { credential: "appleU@gmail.com", pwd: "12345678A" },
];

const pwdCheckList = [
  "Password is at least 8 characters long",
  "Contains at least one letter and one number",
];
const pwdConfirmCheckList = "Passwords match";

export default function HomePage() {
  const router = useRouter();

  // form values
  const [form, setForm] = useState({
    email: "",
    pwd: "",
    pwdConfirm: "",
    checkBoxVal: false,
  });
  const [focused, setFocused] = useState<null | "email" | "pwd" | "pwdConfirm">(
    null
  );

  // Generic onChange
  function setField<K extends keyof typeof form>(
    key: K,
    value: string | boolean
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Email Checking
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = useMemo(() => {
    if (!form.email) return false;
    return emailRegex.test(form.email);
  }, [form.email]);

  // Password Checking
  const pwdRules = useMemo(
    () => ({
      len: form.pwd.length >= 8,
      alnum: /[A-Za-z]/.test(form.pwd) && /\d/.test(form.pwd),
    }),
    [form.pwd]
  );
  const pwdChecklist = [pwdRules.len, pwdRules.alnum];
  const pwdMatch = useMemo(
    () => form.pwdConfirm.length > 0 && form.pwdConfirm === form.pwd,
    [form.pwd, form.pwdConfirm]
  );

  // Overall form validity
  const isComplete = !!form.email && !!form.pwd && !!form.pwdConfirm;
  const isPwdValid = pwdChecklist.every(Boolean) && pwdMatch;
  const isFormValid = emailValid && isPwdValid && form.checkBoxVal;

  const [submitError, setSubmitError] = useState<string>("");

  // Check all field values
  function handleRegister() {
    if (!isComplete) {
      setSubmitError("Please ensure all fields are filled.");
      return;
    }
    // If any field is empty
    if (!emailValid) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    // Ensure all conditions are met
    if (!isPwdValid) {
      setSubmitError("Please ensure all password conditions are satisfied.");
      return;
    }
    // Ensure checkBox is checked
    if (!form.checkBoxVal) {
      setSubmitError("Please ensure the checkbox is checked.");
      return;
    }

    // Otherwise, redirect to homepage
    setSubmitError("");
    router.push("/");
  }

  const showPwdChecklist =
    focused === "pwd" ||
    focused === "pwdConfirm" ||
    form.pwd.length > 0 ||
    form.pwdConfirm.length > 0;

  return (
    <div className="grid grid-cols-2 items-center gap-4 px-10 py-10 md:h-svh">
      {/* Left: Logo */}
      <div className="flex items-center justify-center h-full">
        <img
          src="/branding/websiteLogo_default.svg"
          alt="IdolEar logo"
          className="w-full max-w-[90%] h-auto object-contain"
        />
      </div>

      {/* Right: Form */}
      <div className="flex flex-col min-w-[405px] gap-8 text-primary-400 px-10 py-20 items-center justify-center h-full">
        <label className="text-h1 font-bold">Register</label>
        <form
          className="flex flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div className="w-full flex flex-col gap-4 justify-items-start">
            {/* Email */}
            <InputField
              title="Email"
              hasEncription={false}
              fieldValue={form.email}
              setFieldValue={(v: string) => setField("email", v)}
              hasError={!(emailValid && form.email.length > 0)}
              resetHasError={() => setSubmitError("")}
              underFieldText={"Please enter a valid email address"}
              onFocus={() => {
                setSubmitError("");
                setFocused("email");
              }}
              onBlur={() => setFocused(null)}
            />

            {/* Password */}
            <div className="w-full flex flex-col gap-1 justify-items-start">
              <InputField
                title="Password"
                hasEncription={true}
                fieldValue={form.pwd}
                setFieldValue={(v: string) => setField("pwd", v)}
                hasError={!!submitError && !isPwdValid}
                resetHasError={() => setSubmitError("")}
                onFocus={() => {
                  setSubmitError("");
                  setFocused("pwd");
                }}
                onBlur={() => setFocused(null)}
              />
              {showPwdChecklist &&
                pwdCheckList.map((item: string, index: number) => (
                  <ListItem
                    key={index}
                    label={item}
                    isChecked={pwdChecklist[index]}
                  />
                ))}
            </div>

            {/* Confirm Password */}
            <div className="w-full flex flex-col gap-1 justify-items-start">
              <InputField
                title="Confirm Password"
                hasEncription={true}
                fieldValue={form.pwdConfirm}
                setFieldValue={(v: string) => setField("pwdConfirm", v)}
                hasError={!!submitError && !pwdMatch}
                resetHasError={() => setSubmitError("")}
                onFocus={() => {
                  setSubmitError("");
                  setFocused("pwdConfirm");
                }}
                onBlur={() => setFocused(null)}
              />
              {showPwdChecklist && (
                <ListItem label={pwdConfirmCheckList} isChecked={pwdMatch} />
              )}
              {/* Error Msg */}
              {!!submitError && (
                <label className="text-caption text-error">{submitError}</label>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-2 items-center">
            <div className="w-full flex gap-2 items-center">
              <input
                type="checkbox"
                checked={form.checkBoxVal}
                onChange={() => {
                  setField("checkBoxVal", !form.checkBoxVal);
                  setSubmitError("");
                }}
                aria-invalid={!form.checkBoxVal && !!submitError}
                className={`w-4 h-4 rounded border border-secondary-default/50 accent-primary-300 hover:border-secondary-default focus:outline-none 
                    ${
                      !form.checkBoxVal && !!submitError
                        ? "outline-2 outline-error"
                        : "outline-0"
                    } transition`}
              />
              <label className="text-caption text-primary-400">
                Check to verify you're not a robot
              </label>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              onClick={handleRegister}
            >
              Register
            </Button>
            <TextLink
              variant="secondary"
              link={{
                label: "Already have an account? Sign In",
                href: "/signIn",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
