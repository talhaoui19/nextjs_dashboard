"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MessageInput({ clientId }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (eo) => {
    eo.preventDefault();

    if (!message.trim()) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/admin/messages/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId,
          text: message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      router.refresh();
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.message || "حدث خطأ في إرسال الرسالة");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 flex items-center gap-2 bg-white p-6"
    >
      <input
        type="text"
        placeholder="أكتب شيئا هنا"
        value={message}
        onChange={(eo) => setMessage(eo.target.value)}
        disabled={!clientId || isLoading}
        className="flex-1 bg-[#F4F4F4] text-[#000000] placeholder:text-[#9A9A9A] h-[52px] rounded-[12px] text-[12px] md:text-[14px] pr-[45px] outline-none"
      />

      <button
        type="submit"
        disabled={!clientId || isLoading}
        className="--send-but"
      >
        {isLoading ? "جاري الارسال ..." : "إرسال"}
      </button>
    </form>
  );
}
