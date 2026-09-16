import { NotificationIcon } from "../icons";
import { AdminProfile, Search, SearchModal } from ".";

export default async function Navbar({ admin }) {
  return (
    <header className="w-full bg-white shadow p-3 md:p-4 flex justify-between items-center gap-4">
      <Search placeholder={"بحث شيئ هنا"} />

      <div className="hidden sm:flex items-center gap-2 md:gap-3.75">
        <NotificationIcon />

        <AdminProfile admin={admin} />
      </div>
    </header>
  );
}
