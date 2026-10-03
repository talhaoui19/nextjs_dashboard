"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const ResetPasswordForm = ({ token, email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          newPassword: password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      setError("حدث خطأ في الاتصال");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <label htmlFor="email" className="--label">
          كلمة مرور الجديدة
        </label>
        <input
          type="password"
          id="password"
          required
          className={`--input ${!password && buttonClicked ? "border-[#E74C3C]" : "border-[#D9D9D9]"}`}
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="relative">
        <label htmlFor="password" className="--label">
          تأكيد كلمة المرور الجديدة
        </label>
        <input
          type="password"
          id="password"
          required
          className={`--input ${!confirmPassword && buttonClicked ? "border-[#E74C3C]" : "border-[#D9D9D9]"}`}
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="--but"
        disabled={isLoading}
        onClick={() => {
          setButtonClicked(true);
        }}
      >
        {isLoading ? <div className="--spr"></div> : "إرسال"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
