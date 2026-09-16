"use client";
import { DeleteIcon, EditIcon, InfoIcon } from "@/app/icons";
import Link from "next/link";
import { DeletePopup } from "../../ui";
import { useState } from "react";

const ClientRow = ({ client, index }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <tr>
        <td className="p-4">{index + 1}</td>
        <td className="flex items-center gap-3 p-4 font-medium">
          {client.avatar ? (
            <img
              src={client.avatar}
              alt="client image"
              className="w-14 h-14 rounded-xl"
            />
          ) : (
            <div className="bg-[#F4F6F8] w-14 h-14 rounded-xl"></div>
          )}
          <div className="flex flex-col gap-1 text-base">
            <span className="text-[#232323] text-sm font-bold">
              {client.clientName}
            </span>
            <span className="text-[#6C6C6C] text-base">{client.email}</span>
          </div>
        </td>
        <td className="p-4 ">
          <span className="py-2 px-4 rounded-md bg-[#F4F4F4]">
            يوم {""}
            {new Date(client.createdAt).toLocaleDateString("ar-DZ", {
              year: "numeric",
              month: "long",
              day: "numeric",
              numberingSystem: "latn",
            })}
          </span>
        </td>
        <td className="p-4">{client.wilaya}</td>
        <td className="p-4">219 دج</td>
        <td className="flex items-center gap-2 p-4">
          <Link
            href={`/dashboard/clients/${client._id}`}
            className="--info-but"
          >
            <InfoIcon />
          </Link>
          <Link
            href={`/dashboard/clients/${client._id}/edit_client`}
            className="--edit-but"
          >
            <EditIcon />
          </Link>
          <button
            onClick={() => {
              setIsDeleting(true);
            }}
            className="--delete-but"
          >
            <DeleteIcon />
          </button>
        </td>
      </tr>
      <DeletePopup
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        itemIdType={"clients"}
        itemId={client._id}
        title="العميل"
      />
    </>
  );
};

export default ClientRow;
