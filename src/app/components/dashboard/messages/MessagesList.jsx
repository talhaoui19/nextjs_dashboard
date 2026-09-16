"use client";
import { useEffect, useRef } from "react";
import { DoubleCheckIcon } from "../../icons";

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
                <div className="bg-[#E7F7ED] text-gray-900 px-4 py-2 rounded-lg max-w-xs">
                  <p className="text-sm">{message.text}</p>

                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs text-gray-600">
                      {new Date(message.createdAt).toLocaleTimeString("ar-DZ", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </span>

                    <DoubleCheckIcon />
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
