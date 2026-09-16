"use client";
import { useRouter } from "next/navigation";
import TextInput from "../../ui/TextInput";
import toast from "react-hot-toast";
import { useState } from "react";

const EditPasswordForm = () => {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/password/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("تم تحديث كلمة المرور بنجاح .");
      setTimeout(router.push("/dashboard/settings"), 1500);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("خطأ في الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-5 mt-8">
        <TextInput
          label="كلمة المرور القديمة"
          type="password"
          placeholder="أدخل كلمة المرور القديمة"
          value={currentPassword}
          className="col-span-2"
          onChange={(eo) => setCurrentPassword(eo.target.value)}
          inputClassName={`--sett-input ${!currentPassword && buttonClicked ? "border-[#E74C3C]" : "border-[#D9D9D9]"} `}
        />

        <TextInput
          className="flex-1"
          label="كلمة المرور الجديدة"
          type="password"
          placeholder="أدخل كلمة المرور الجديدة"
          value={newPassword}
          onChange={(eo) => setNewPassword(eo.target.value)}
          inputClassName={`--sett-input ${!newPassword && buttonClicked ? "border-[#E74C3C]" : "border-[#D9D9D9]"}`}
        />
        <TextInput
          label="تأكيد كلمة المرور الجديدة"
          type="password"
          placeholder="قم بتأكيد كلمة المرور الجديدة"
          value={confirmPassword}
          onChange={(eo) => setConfirmPassword(eo.target.value)}
          inputClassName={`--sett-input ${!confirmPassword && buttonClicked ? "border-[#E74C3C]" : "border-[#D9D9D9]"}`}
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
        <button
          type="submit"
          className="--sett-but"
          onClick={() => {
            setButtonClicked(true);
          }}
        >
          {loading ? <div className="--spr"></div> : "حفظ التغييرات"}
        </button>
      </div>
    </form>
  );
};

export default EditPasswordForm;
