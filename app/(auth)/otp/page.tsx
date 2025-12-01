"use client";

import ErrorHandler from "@/components/common/ErrorHandler";
import useMutationClient from "@/hooks/useMutationClient";
import { useValueStore } from "@/providers/useState";
import { Loader } from "lucide-react";
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";

type OTPFormData = {
  otp: string[];
};

const Page = () => {
  const { control, handleSubmit, setValue } = useForm<OTPFormData>({
    defaultValues: { otp: ["", "", "", "", "", ""] },
  });
  const { apiError, setApiError, email } = useValueStore();

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const otpMutation = useMutationClient({
    url: `/auth/verify-email`,
    method: "post",
    isPrivate: false,
    successMessage: " OTP verified successfully!",
    redirectTo: "/login",
  });
  const resetMutation = useMutationClient({
    url: `/auth/resend-otp`,
    method: "post",
    isPrivate: false,
    successMessage: " OTP resent successfully!",
  });

  const onSubmit = (data: OTPFormData) => {
    const payload = {
      email,
      code: data.otp.join(""),
    };

    otpMutation.mutate({ data: payload });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: any
  ) => {
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

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    field: any
  ) => {
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

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    field: any
  ) => {
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

  const resendOtp = () => {
    const payload = {
      email,
      type: "verification",
    };
    resetMutation.mutate({ data: payload });
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-primaryColor text-center mb-6">
        Enter OTP
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Enter the 6-digit OTP sent to your registered number/email
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-6"
      >
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
          className="w-full bg-primaryColor text-white py-3 rounded-lg flex justify-center items-center font-semibold hover:opacity-90 transition"
        >
          {otpMutation.isPending ? (
            <Loader className="animate-spin text-white" size={24} />
          ) : (
            "Verify OTP"
          )}
        </button>
      </form>

      <p className="text-sm text-center text-gray-500 mt-4">
        Didn't receive OTP?{" "}
        <button
          className="text-primaryColor hover:underline"
          onClick={resendOtp}
        >
          {resetMutation.isPending ? " Sending..." : "Resend OTP"}
        </button>
      </p>
      {apiError && (
        <ErrorHandler message={apiError} onClose={() => setApiError("")} />
      )}
    </div>
  );
};

export default Page;
