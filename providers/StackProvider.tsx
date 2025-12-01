"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
// Create a QueryClient instance
const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

const StackProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer position="top-center" draggable transition={Slide} />
    </QueryClientProvider>
  );
};

export default StackProvider;
