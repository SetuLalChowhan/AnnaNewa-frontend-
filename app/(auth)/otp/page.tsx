"use client";

import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";

type OTPFormData = {
  otp: string[];
};

const Page = () => {
  const { control, handleSubmit, setValue } = useForm<OTPFormData>({
    defaultValues: { otp: ["", "", "", "", "", ""] },
  });

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const onSubmit = (data: OTPFormData) => {
    console.log("OTP Entered:", data.otp.join(""));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: any) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...(field.value ?? ["", "", "", "", "", ""])];
      newOtp[index] = value;
      field.onChange(newOtp);
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...(field.value ?? ["", "", "", "", "", ""])];
      newOtp[index] = "";
      field.onChange(newOtp);
    }
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number, field: any) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...(field.value ?? ["", "", "", "", "", ""])];
      newOtp[index] = "";
      field.onChange(newOtp);
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, field: any) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").slice(0, 6).split("");
    const newOtp = [...(field.value ?? ["", "", "", "", "", ""])];
    pasteData.forEach((digit, i) => {
      if (/\d/.test(digit)) newOtp[i] = digit;
    });
    field.onChange(newOtp);
    const nextIndex = pasteData.length > 5 ? 5 : pasteData.length - 1;
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-primaryColor text-center mb-6">
        Enter OTP
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Enter the 6-digit OTP sent to your registered number/email
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-6">
        <Controller
          name="otp"
          control={control}
          render={({ field }) => {
            const otpValue = field.value ?? ["", "", "", "", "", ""];
            return (
              <div className="flex justify-between gap-2">
                {otpValue.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    onChange={(e) => handleChange(e, index, field)}
                    onKeyDown={(e) => handleBackspace(e, index, field)}
                    onPaste={(e) => handlePaste(e, field)}
                    className="w-12 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  />
                ))}
              </div>
            );
          }}
        />

        <button
          type="submit"
          className="w-full bg-primaryColor text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Verify OTP
        </button>
      </form>

      <p className="text-sm text-center text-gray-500 mt-4">
        Didn't receive OTP?{" "}
        <button className="text-primaryColor hover:underline">Resend OTP</button>
      </p>
    </div>
  );
};

export default Page;
