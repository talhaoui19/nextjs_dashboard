"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LougoutIcon } from "../icons";
import { useState } from "react";

const LogoutPopup = ({ isLoggingOut, setIsLoggingOut }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
      });

      toast.success("تم تسجيل الخروج بنجاح .");
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  return (
    <section
      className={`fixed inset-0 flex items-center justify-center bg-[#23232333] transition-all duration-300 ${
        isLoggingOut ? "opacity-100 visible" : "opacity-0 invisible"
      } z-50`}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div
          className={`w-[395px] bg-white p-6 rounded-xl transition-all duration-300 ${
            isLoggingOut ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 text-[var(--main-color)]">
            <LougoutIcon />
            <h2 className="text-black font-semibold">تسجيل الخروج ؟</h2>
          </div>

          <p className="mt-3 text-[#9A9A9A] text-base">
            أنت تحاول تسجيل الخرروج <br /> هل أنت متأكد أنك تريد تسجيل الخروج ؟
          </p>

          <div className="flex items-center justify-end gap-2 bg-white mt-6">
            <button
              onClick={() => {
                setIsLoggingOut(false);
              }}
              className="h-[50px] bg-[#F9F9F9] text-[#232323] p-[14px] rounded-[12px]"
            >
              إلغاء
            </button>
            <button
              onClick={handleLogout}
              className="w-[160px] h-[50px] flex items-center justify-center gap-1 bg-[var(--main-color)] text-white p-[14px] rounded-[12px]"
            >
              {loading ? (
                <div className="--spr"></div>
              ) : (
                <>
                  تسجيل الخروج
                  <LougoutIcon />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoutPopup;
