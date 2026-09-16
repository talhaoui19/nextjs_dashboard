"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lougout_icon, SettingsLink, SidebarData } from "../data";
import LogoutPopup from "./LogoutPopup";
import { LougoutIcon } from "../icons";
import { useState } from "react";

export default function Sidebar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white text-white p-4">
      <div></div>
      <ul className="space-y-[3px]">
        <h4 className="text-[var(--secondary-color)] text-[15px] leading-8">
          القائمة
        </h4>
        {SidebarData.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block text-[var(--secondary-color)] text-[16px] hover:text-white px-[24px] py-[16px] hover:bg-[var(--main-color)] rounded-[12px] transition ${
                pathname === link.href ||
                (link.href !== "/dashboard" && pathname.startsWith(link.href))
                  ? "bg-[var(--main-color)] text-white"
                  : ""
              }`}
            >
              <span className="flex items-center gap-[16px]">
                {link.icon}
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="space-y-[3px]">
        <h4 className="text-[var(--secondary-color)] text-[15px] leading-8">
          المزيد
        </h4>
        {SettingsLink.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block text-[var(--secondary-color)] text-[16px] hover:text-white px-[24px] py-[16px] hover:bg-[var(--main-color)] rounded-[12px] transition ${
                pathname.startsWith(link.href)
                  ? "bg-[var(--main-color)] text-white"
                  : ""
              }`}
            >
              <span className="flex items-center gap-[16px]">
                {link.icon}
                {link.label}
              </span>
            </Link>
          </li>
        ))}
        <li>
          <button
            className={`block text-[var(--main-color)]  px-[24px] py-[16px] rounded-[12px] transition `}
            onClick={() => {
              setIsLoggingOut(true);
            }}
          >
            <span className="flex items-center gap-[16px]">
              <LougoutIcon />
              تسجيل الخروج
            </span>
          </button>
        </li>
      </ul>
      <LogoutPopup
        isLoggingOut={isLoggingOut}
        setIsLoggingOut={setIsLoggingOut}
      />
    </aside>
  );
}
