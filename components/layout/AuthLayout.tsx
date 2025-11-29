import React from "react";
import AuthImage from "@/assets/images/authetication.jpg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className=" section-padding-x bg-cover bg-center bg-no-repea min-h-screen h-full flex justify-center items-center"
      style={{ backgroundImage: `url(${AuthImage.src})` }}
    >
      <div className=" py-16 max-w-2xl w-full mx-auto">
        <div className=" ">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
