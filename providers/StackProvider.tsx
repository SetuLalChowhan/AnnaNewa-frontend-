"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import { AuthProvider } from "./AuthProvider";
// Create a QueryClient instance
const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
  initialData: any;
}

const StackProvider = ({ children, initialData }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider initialData={initialData}>{children}</AuthProvider>
      <ToastContainer position="top-center" draggable transition={Slide} />
    </QueryClientProvider>
  );
};

export default StackProvider;
