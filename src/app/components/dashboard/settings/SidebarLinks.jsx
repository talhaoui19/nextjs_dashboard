"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsArrowRightIcon } from "@/app/icons";
import { SidebarLinksData } from "@/app/dashboard/settings/data/links";

const SidebarLinks = () => {
  const pathname = usePathname();
  return (
    <div className="bg-white p-4 rounded-xl flex-1 h-fit">
      <ul className="space-y-0.75">
        {SidebarLinksData.map((link) => (
          <li key={link.href}>
            <Link
              href={`${!link.href ? "#" : link.href}`}
              className={`flex items-center justify-between text-[var(--secondary-color)] text-[16px] hover:text-white px-[24px] py-[16px] rounded hover:bg-[var(--main-color)] rounded-[12px] transition ${
                pathname === link.href ? "bg-(--main-color) text-white" : ""
              }`}
            >
              <span className="flex items-center gap-4">
                {link.icon}
                {link.label}
              </span>
              <div>
                <SettingsArrowRightIcon />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarLinks;
