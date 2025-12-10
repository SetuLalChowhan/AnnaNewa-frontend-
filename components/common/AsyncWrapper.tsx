'use client';

import React, { ReactNode, Suspense, useState, useEffect } from "react";
import { Loader, AlertCircle } from "lucide-react";

interface AsyncWrapperProps {
  children: ReactNode;
  errorMessage?: string;
  loadingMessage?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  { children: ReactNode; errorMessage: string },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; errorMessage: string }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("AsyncWrapper Error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-10 px-4">
          <AlertCircle className="text-red-500 mb-3" size={32} />
          <p className="text-red-600 font-semibold text-center">
            {this.props.errorMessage}
          </p>
          {/* <p className="text-gray-500 text-sm mt-2">
            {this.state.error?.message}
          </p> */}
          <button
            onClick={this.handleRetry}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg  transition-colors font-medium"
          >
            Please try again later
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const AsyncWrapper: React.FC<AsyncWrapperProps> = ({
  children,
  errorMessage = "Something went wrong",
  loadingMessage = "Loading...",
}) => {
  return (
    <ErrorBoundary errorMessage={errorMessage}>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-10">
            <Loader className="animate-spin text-green-600 mb-2" size={32} />
            <p className="text-gray-600 text-sm">{loadingMessage}</p>
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default AsyncWrapper;