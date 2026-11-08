"use client";
import { useEffect, useRef } from "react";
import { DoubleCheckIcon } from "../../icons";
import { DeleteIcon, EditIcon, InfoIcon } from "@/app/icons";
import Link from "next/link";

const icons = {
  copy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M3 6h18" />
      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  ),
};


function IconBtn({ children, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors ${
        danger ? "hover:bg-red-50 hover:text-red-500" : "hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );
}


export default function MessagesList({ messages }) {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };
  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 min-h-0 overflow-y-auto bg-[#F9F9F9] px-8 py-6"
    >
      <div className="flex flex-col gap-3">
        {messages.length > 0 &&
          new Date(messages[messages.length - 1].createdAt) <
            new Date(new Date().setDate(new Date().getDate() - 1)) && (
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300"></div>

              <span className="text-sm text-gray-500">
                {isYesterday(new Date(messages[messages.length - 1].createdAt))
                  ? "أمس"
                  : new Date(
                      messages[messages.length - 1].createdAt,
                    ).toLocaleDateString("en-GB")}
              </span>

              <div className="h-px flex-1 bg-gray-300"></div>
            </div>
          )}

        {messages.length === 0 ? (
          <div className="w-fit bg-white text-[#232323] px-4 py-2 rounded-lg rounded-tl-none">
            <p className="text-sm">
              لم تبدأ المحادثة مع هذا العميل بعد.
              <br />
              أرسل رسالة لبدء التواصل معه.
            </p>

            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-xs text-gray-600">
                {new Date().toLocaleDateString("ar-DZ", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.sender === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "admin" ? (
                <div className="flex items-center">
                 <div className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 max-md:opacity-100">
  <IconBtn label="نسخ" onClick={() => handleCopy(m)}>{icons.copy}</IconBtn>
  <IconBtn label="تعديل" onClick={() => handleEdit(m)}>{icons.edit}</IconBtn>
  <IconBtn label="حذف" danger onClick={() => handleDelete(m)}>{icons.trash}</IconBtn>
</div>

                  <div className="bg-[#E7F7ED] text-gray-900 px-4 py-2 rounded-lg max-w-xs">
                    <p className="text-sm">{message.text}</p>

                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs text-gray-600">
                        {new Date(message.createdAt).toLocaleTimeString(
                          "ar-DZ",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          },
                        )}
                      </span>

                      <DoubleCheckIcon />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white text-[#232323] px-4 py-2 rounded-lg max-w-2xl">
                  <p className="text-sm">{message.text}</p>

                  <span className="text-xs text-gray-600 block mt-1">
                    {new Date(message.createdAt).toLocaleTimeString("ar-DZ", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
