import { MoreIcon } from "@/app/icons";
import Link from "next/link";
import { Avatar } from "../../ui";

export default function HeaderSection({ client }) {
  return (
    <div className="shrink-0 bg-white border-b border-[#D9D9D9] px-8 py-4 flex items-center justify-between">
      <div className="flex items-start gap-4">
        <div className="relative">
          <Link href={`/dashboard/clients/${client._id}`}>
            {client.avatar ? (
              <img
                src={client.avatar}
                alt={client.clientName}
                className="w-14 h-14"
              />
            ) : (
              <Avatar name={client.clientName} />
            )}
          </Link>
          <div className={`absolute -left-1.25 -bottom-1.25 w-4.5 h-4.5 bg-[#088B3A] rounded-full border-2 border-white`} />
        </div>

        <div className="mt-1">
          <h2 className="font-semibold text-gray-900 text-base">
            {client.clientName}
          </h2>

          <p className="text-sm text-gray-500">عبر الإنترنت</p>
        </div>
      </div>

      <button className="p-1">
        <MoreIcon />
      </button>
    </div>
  );
}
