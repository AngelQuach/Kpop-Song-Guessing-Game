"use client";

import React, { useState, useEffect } from "react";
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
  const [email, setEmail] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>(
    "Incorrect verification code"
  );
  const [pwd, setPwd] = useState<string>("");
  const [pwdListState, setPwdListState] = useState<boolean[]>([false, false]);
  const [pwdConfirm, setPwdConfirm] = useState<string>("");
  const [pwdMatch, setPwdMatch] = useState<boolean>(false);
  const [isPwdFocused, setIsPwdFocused] = useState<boolean>(false);
  const [isPwdConfirmFocused, setIsPwdConfirmFocused] =
    useState<boolean>(false);

  useEffect(() => {
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0 || !emailRegex.test(email)) {
      setHasEmailError(true);
    } else {
      setHasEmailError(false);
    }
  }, [email, hasEmailError]);

  // Adjust pwdListState
  useEffect(() => {
    let newPwdListState: boolean[] = [...pwdListState];

    newPwdListState[0] = pwd.length >= 8 ? true : false;
    newPwdListState[1] = /[A-Za-z]/.test(pwd) && /\d/.test(pwd) ? true : false;

    setPwdListState(newPwdListState);
  }, [pwd]);

  // Adjust pwdMatch
  useEffect(() => {
    const newVal: boolean = pwd === pwdConfirm ? true : false;
    setPwdMatch(newVal);
  }, [pwd, pwdConfirm]);

  const resetHasError = () => {
    setHasEmailError(false);
    setHasError(false);
  };

  function handleRegister() {
    // If any field is empty
    if (email.length === 0 || pwd.length === 0 || pwdConfirm.length === 0) {
      setHasError(true);
      setErrorMsg("Please ensure all fields are filled");
      return;
    }

    // Ensure all conditions are met
    if (!pwdMatch || pwdListState.includes(false)) {
      setHasError(true);
      setErrorMsg("Please ensure all password conditions are satisfied");
      return;
    }

    // Otherwise, redirect to homepage
    router.push("/");
  }

  return (
    <div className="grid grid-cols-2 items-center gap-4 px-10 py-10 md:h-svh">
      <div className="flex items-center justify-center h-full">
        <img
          src="/branding/websiteLogo_default.svg"
          alt="IdolEar logo"
          className="w-full max-w-[90%] h-auto object-contain"
        />
      </div>
      <div className="flex flex-col min-w-[405px] gap-8 text-primary-400 px-10 py-20 items-center justify-center h-full">
        <label className="text-h1 font-bold">Register</label>
        <div className="flex flex-col gap-8">
          <div className="w-full flex flex-col gap-4 justify-items-start">
            <InputField
              title="Email"
              hasEncription={false}
              fieldValue={email}
              setFieldValue={setEmail}
              hasError={hasEmailError}
              resetHasError={resetHasError}
              underFieldText="Please enter a valid email address"
            />
            <div className="w-full flex flex-col gap-1 justify-items-start">
              <InputField
                title="Password"
                hasEncription={true}
                fieldValue={pwd}
                setFieldValue={setPwd}
                hasError={hasError}
                resetHasError={resetHasError}
                onFocus={() => {
                  setIsPwdFocused(true);
                  setIsPwdConfirmFocused(false);
                }}
              />
              {isPwdFocused &&
                pwdCheckList.map((item: string, index: number) => (
                  <ListItem
                    key={index}
                    label={item}
                    isChecked={pwdListState[index]}
                  />
                ))}
            </div>
            <div className="w-full flex flex-col gap-1 justify-items-start">
              <InputField
                title="Confirm Password"
                hasEncription={true}
                fieldValue={pwdConfirm}
                setFieldValue={setPwdConfirm}
                hasError={hasError}
                resetHasError={resetHasError}
                underFieldText={errorMsg}
                onFocus={() => {
                  setIsPwdFocused(false);
                  setIsPwdConfirmFocused(true);
                }}
              />
              {isPwdConfirmFocused && (
                <ListItem label={pwdConfirmCheckList} isChecked={pwdMatch} />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 items-center">
            <Button
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
        </div>
      </div>
    </div>
  );
}
