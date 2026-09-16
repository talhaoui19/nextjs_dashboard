"use client";
import { CalendarIcon } from "@/app/dashboard/settings/icons";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../../ui/TextInput";

const UpdateProfileForm = ({ admin }) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState(admin.firstName);
  const [lastName, setLastName] = useState(admin.lastName);
  const [birthDate, setBirthDate] = useState(
    new Date(admin.birthDate).toISOString().split("T")[0],
  );
  const [country, setCountry] = useState(admin.country);
  const [phone, setPhone] = useState(admin.phone);
  const [address, setAddress] = useState(admin.address);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/data/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName || admin.firstName,
          lastName: lastName || admin.lastName,
          birthDate:
            birthDate || new Date(admin.birthDate).toISOString().split("T")[0],
          country: country || admin.country,
          phone: phone || admin.phone,
          address: address || admin.address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "حدث خطأ");
        return;
      }

      router.refresh();
      toast.success("تم تحديث البيانات بنجاح .");
    } catch (error) {
      toast.error("خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <TextInput
          label="الاسم الأول"
          placeholder="أرفي"
          value={firstName}
          inputClassName="--sett-input border-[#D9D9D9]"
          onChange={(eo) => setFirstName(eo.target.value)}
        />

        <TextInput
          label="الاسم الثاني"
          placeholder="غانتنج"
          value={lastName}
          inputClassName="--sett-input border-[#D9D9D9]"
          onChange={(eo) => setLastName(eo.target.value)}
        />

        <TextInput
          label="اسم المستخدم"
          placeholder="arfi.ganteng"
          value={admin.email?.split("@")[0]}
          inputClassName="--sett-input border-[#D9D9D9]"
        />

        <TextInput
          label="البريد الإلكتروني"
          placeholder="arfi.ganteng@mail.com"
          disabled
          value={admin.email}
          inputClassName="--sett-input border-[#D9D9D9]"
        />

        <TextInput
          className="col-span-2"
          label="تاريخ الميلاد"
          type={"date"}
          placeholder="17 يناير 1997"
          value={birthDate}
          inputClassName="--sett-input border-[#D9D9D9]"
          onChange={(eo) => setBirthDate(eo.target.value)}
          icon={<CalendarIcon />}
        />

        <TextInput
          label="البلد"
          placeholder="إندونيسيا"
          value={country}
          inputClassName="--sett-input border-[#D9D9D9]"
          onChange={(eo) => setCountry(eo.target.value)}
        />

        <TextInput
          label="رقم الهاتف"
          placeholder="+62 823-2213-2231"
          value={phone}
          inputClassName="--sett-input border-[#D9D9D9]"
          onChange={(eo) => setPhone(eo.target.value)}
        />

        <TextInput
          className="col-span-2"
          label="العنوان"
          placeholder="جى رايا كاليجاوى كم 5، جاوا تنجاه، جاوا تنجاه، سيمارانج"
          value={address}
          inputClassName="--sett-input border-[#D9D9D9]"
          onChange={(eo) => setAddress(eo.target.value)}
        />
      </div>

      <div className="flex items-center justify-end gap-2 mt-8">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="--sett-but-out"
        >
          تجاهل
        </button>
        <button type="submit" className="--sett-but">
          {loading ? <div className="--spr"></div> : "حفظ التغييرات"}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
