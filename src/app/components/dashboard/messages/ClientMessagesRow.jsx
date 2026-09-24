"use client";

import { Avatar } from "../../ui";

export default function ClientMessagesRow({
  client,
  latestMessage,
  selectedClient,
  setSelectedClient,
}) {
  return (
    <div
      onClick={() => setSelectedClient(client)}
      className={`p-5 mb-2 rounded-xl cursor-pointer transition-colors hover:bg-gray-50 ${
        selectedClient?._id === client._id ? "bg-gray-50" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {client.avatar ? (
          <img
            src={client.avatar}
            alt={client.clientName}
            className="w-14 h-14"
          />
        ) : (
          <Avatar name={client.clientName} />
        )}

        <div className="relative flex-1 min-w-0">
          <div className="flex items-center justify-between mt-1">
            <h3 className="font-semibold text-gray-900 text-sm">
              {client.clientName}
            </h3>
            <span className="text-sm text-[#9A9A9A]">
              {latestMessage
                ? new Date(latestMessage.createdAt).toLocaleDateString(
                    "ar-DZ",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    },
                  )
                : new Date().toLocaleDateString("ar-DZ", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
            </span>
          </div>

          <div className="absolute left-10 w-3.5 h-3.5 bg-[#088B3A] rounded-full border-2 border-white mt-2" />
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-3 mr-2">
        {latestMessage
          ? latestMessage.text
          : "لم تبدأ المحادثة مع هذا العميل بعد.أرسل رسالة لبدء التواصل معه."}
      </p>
    </div>
  );
}
