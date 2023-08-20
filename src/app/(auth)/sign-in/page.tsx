"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/lib/axios";
import OtpScreen from "@/components/OtpScreen";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)
    let payload = { email, password };
    let response = await await axios.post("/auth/login/", payload);
    if (response.status === 200) {
      setShowOTP(true)
    }
    setIsLoading(false)
  };

  const handleOtpSubmit = async (otp: string) => {
    if(email && password && otp){
      const result = await signIn("credentials", {
        email,
        otp,
        callbackUrl: `${window.location.origin}/`,
      })
      console.log(result, "result")
    }else{
      console.log('error')
    }
  };

  const handleResetOtp = async () => {
    console.log('reset')
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h1 className="font-bold text-3xl md:text-4xl text-blue-500">Loving-O</h1>

      {showOTP ? (
        <OtpScreen handleOtpSubmit={handleOtpSubmit} handleResetOtp={handleResetOtp} isLoading={isLoading} />
      ) : (
        <>
          <h2 className="text-xl md:text-2xl text-gray-800 font-bold mt-4 dark:text-gray-100">
            Log in to your Account
          </h2>
          <p className="text-gray-400 text-sm mt-2">Welcome back!</p>

          <form onSubmit={handleSubmit}>
            <div className="my-4 flex flex-col space-y-4 max-w-md">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <Button disabled={isLoading} variant="default" type="submit">
                {" "}
                Login{" "}
              </Button>
            </div>
          </form>
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-blue-600 hover:underline transition-all duration-150"
            >
              Create an account
            </Link>{" "}
          </p>
        </>
      )}
    </div>
  );
};

export default page;
