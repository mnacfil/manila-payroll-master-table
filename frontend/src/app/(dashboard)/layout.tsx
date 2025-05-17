"use client";

import DashboardSidebar from "@/components/layout/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { BreadCrumb } from "primereact/breadcrumb";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";

const LARGE_WIDTH = 1024;

const DashboardLayout = ({ children }: Children) => {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isLargeScreen, setIsLargeScreen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= LARGE_WIDTH;
    }
    return true;
  });
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= LARGE_WIDTH);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const breadcrumbItems = [
    { label: "Apps" },
    ...pathname
      .slice(1)
      .split("/")
      .map((item) => ({ label: item, command: () => router.push(`/${item}`) })),
  ];
  return (
    <div className="w-full min-h-screen">
      <div className="flex h-full">
        {open && isLargeScreen && (
          <DashboardSidebar otherClassName="hidden lg:block" />
        )}
        <div
          className={`flex-1 min- h-full  p-6 py-0 ${
            open && isLargeScreen && "ml-[250px]"
          }`}
        >
          <div className="flex items-center gap-8 my-5">
            <i
              className={"pi pi-bars cursor-pointer"}
              style={{ fontSize: "1.25rem" }}
              onClick={() => {
                if (isLargeScreen) {
                  setOpen((prev) => !prev);
                } else {
                  setVisible(true);
                }
              }}
            ></i>
            <BreadCrumb
              model={breadcrumbItems}
              home={{ icon: "pi pi-home" }}
              className="border-none bg-transparent"
            />
          </div>
          <main className="h-full container  py-8 mx-auto max-w-7xl">
            {children}
          </main>
        </div>
      </div>
      <div className="flex justify-center">
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          className="w-[250px]"
          content={({ closeIconRef, hide }) => <DashboardSidebar />}
        ></Sidebar>
      </div>
    </div>
  );
};

export default DashboardLayout;
