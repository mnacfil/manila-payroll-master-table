import { ReactNode } from "react";

const DashboardLayout = ({ children }: Children) => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex gap-6">
        <aside>Sidebar</aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
