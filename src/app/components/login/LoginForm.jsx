"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import TextInput from "../ui/TextInput";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const router = useRouter();

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      router.push("/dashboard");
      toast.success("تم تسجيل الدخول بنجاح .");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        id="email"
        label=" البريد الإلكتروني"
        type="email"
        placeholder="name@mail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        inputClassName={
          !email && buttonClicked ? "border-[#E74C3C]" : "border-[#D9D9D9]"
        }
      />

      <TextInput
        id="password"
        label="كلمة المرور"
        type="password"
        placeholder="********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        inputClassName={
          !password && buttonClicked ? "border-[#E74C3C]" : "border-[#D9D9D9]"
        }
      />

      <div className="text-left">
        <Link
          href="/forget_password"
          className="text-sm text-[var(--main-color)] hover:underline"
        >
          هل نسيت كلمة المرور؟
        </Link>
      </div>

      <button
        type="submit"
        className="w-fit --but"
        disabled={isLoading}
        onClick={() => {
          setButtonClicked(true);
        }}
      >
        {isLoading ? <div className="--spr" /> : "تسجيل الدخول"}
      </button>
    </form>
  );
};

export default LoginForm;
