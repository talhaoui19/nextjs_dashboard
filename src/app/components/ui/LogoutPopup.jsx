"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LougoutIcon } from "../icons";
import { useState } from "react";

const LogoutPopup = ({ isLoggingOut, setIsLoggingOut }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
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
          className={`w-98.75 bg-white p-6 rounded-xl transition-all duration-300 ${
            isLoggingOut ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 text-(--main-color)">
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
              className="h-12.5 bg-[#F9F9F9] text-[#232323] p-3.5 rounded-xl"
            >
              إلغاء
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-40 h-12.5 flex items-center justify-center gap-1 bg-(--main-color) text-white p-3.5 rounded-xl disabled:opacity-50"
            >
              {isLoading ? (
                <div className="--spr" />
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
