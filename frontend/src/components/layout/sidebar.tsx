"use client";

import { DashboardLinks } from "@/lib/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ripple } from "primereact/ripple";
import { StyleClass } from "primereact/styleclass";
import { useRef } from "react";

type Props = {
  otherClassName?: string;
};

const Sidebar = ({ otherClassName }: Props) => {
  const ref = useRef(null);
  const pathname = usePathname();

  return (
    <aside
      className={`h-screen fixed top-0 left-0 z-10 w-[250px] shadow ${otherClassName}`}
    >
      <div className="p-6 flex flex-col h-full ">
        <div className="text-2xl font-medium mb-5">Manila Payroll</div>
        <div className="overflow-y-auto w-full">
          {DashboardLinks.map((group) => (
            <ul className="list-none m-0" key={group.title}>
              <li>
                <StyleClass
                  nodeRef={ref}
                  selector="@next"
                  enterFromClassName="hidden"
                  enterActiveClassName="slidedown"
                  leaveToClassName="hidden"
                  leaveActiveClassName="slideup"
                  toggleClassName="hidden"
                >
                  <div
                    ref={ref}
                    className="p-ripple p-3 flex items-center justify-between text-600 cursor-pointer  w-full"
                  >
                    <span className="font-medium">{group.title}</span>
                    <i className="pi pi-chevron-down"></i>
                    <Ripple />
                  </div>
                </StyleClass>
                <ul className="list-none p-0 m-0 overflow-hidden">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`p-ripple flex gap-2 items-center cursor-pointer p-3 border-round text-700 hover:font-bold duration-300 transition-colors w-full ${
                          item.href === pathname && "font-bold "
                        }`}
                      >
                        <i
                          className={`pi pi-${item.icon}`}
                          style={{ fontSize: "1rem" }}
                        ></i>
                        <span className="text-sm line-clamp-1">
                          {item.label}
                        </span>
                        <Ripple />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          ))}
        </div>
        <div className="mt-auto">Settings</div>
      </div>
    </aside>
  );
};

export default Sidebar;
