"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/password/forget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setEmail("");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <label htmlFor="email" className="--label">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          id="email"
          className={`--input ${!email && buttonClicked ? "border-[#E74C3C]" : "border-[#D9D9D9]"}`}
          placeholder="name@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="--but"
        onClick={() => {
          setButtonClicked(true);
        }}
      >
        {loading ? <div className="--spr"></div> : "إرسال"}
      </button>
    </form>
  );
};

export default EmailForm;
