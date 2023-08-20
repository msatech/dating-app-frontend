import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Button } from "./ui/button";

interface OtpScreenProps {
  handleOtpSubmit: (value: string) => void;
  handleResetOtp: () => void;
  isLoading?: boolean
}

const OtpScreen: React.FC<OtpScreenProps> = ({ handleOtpSubmit, handleResetOtp, isLoading }) => {
  const [otp, setOtp] = useState("");

  return (
    <>
      <h2 className="text-xl md:text-2xl text-gray-800 font-bold mt-4 dark:text-gray-100">
        Enter 6 Digit OTP
      </h2>
      <p className="text-gray-400 text-sm mt-2">OTP sent to your email</p>
      <div className="my-6 flex flex-col gap-6 max-w-sm">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => <input {...props} />}
          containerStyle="flex justify-between w-full flex-1"
          inputStyle="h-10 md:h-14 text-center flex-1 mr-4 flex rounded-xl border border-gray-300 focus:ring focus:ring-indigo-300 focus:outline-none"
        />
        <Button disabled={isLoading} onClick={() => handleOtpSubmit(otp)}> Confirm </Button>
        <span className="text-blue-600 hover:underline cursor-pointer transition-all duration-150 text-sm">resend OTP</span>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        We've sent an OTP to your registered mobile number.
      </p>
    </>
  );
}

export default OtpScreen;
