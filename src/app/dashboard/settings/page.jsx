import {
  ProfileImage,
  UpdateProfileForm,
} from "@/app/components/dashboard/settings";
import { getAdmin } from "@/lib/data";

export default async function SettingsPage() {
  const admin = await getAdmin();
  return (
    <section className="bg-white p-4 rounded-bl-xl flex-2">
      <h4 className="text-[18px] font-semibold">المعلومات الشخصية</h4>

      <ProfileImage image={admin.image} />

      <UpdateProfileForm admin={admin} />
    </section>
  );
}
