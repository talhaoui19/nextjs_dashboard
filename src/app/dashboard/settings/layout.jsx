import { SidebarLinks } from "@/app/components/dashboard/settings";
import { HeaderSection } from "@/app/components/ui";

export default function SettingsLayout({ children }) {
  return (
    <main className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
      <HeaderSection title={"الإعدادات"} />
      <div className="flex gap-4 mt-6">
        <SidebarLinks />
        <div className="flex-2">{children}</div>
      </div>
    </main>
  );
}
