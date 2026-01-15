import DashboardLayout from "@/components/layout/DashboardLayout";
import PrivateRoute from "@/components/shared/PrivateRoute";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </PrivateRoute>
  );
};

export default layout;
