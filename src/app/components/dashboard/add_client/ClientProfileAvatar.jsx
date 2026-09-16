"use client";
import { ImageIcon } from "@/app/icons";
import { useState } from "react";
import toast from "react-hot-toast";

const ClientProfileAvatar = ({ avatar, onAvatarChange }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarUpload = async (eo) => {
    const file = eo.target.files?.[0];

    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading("جاري رفع الصورة ...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      );
      formData.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (data.secure_url) {
        onAvatarChange(data.secure_url);
        toast.success("تم رفع الصورة بنجاح", { id: toastId });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("فشل رفع الصورة!", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAvatar = () => {
    onAvatarChange("");
  };

  return (
    <div className="w-full lg:w-1/3 space-y-6">
      <div className="bg-white p-6 rounded-xl">
        <h2 className="text-base text-[#232323] font-semibold mb-4">
          صورة الملف الشخصي
        </h2>

        {avatar ? (
          <div className="flex items-start gap-3">
            <img
              src={avatar}
              alt="صورة العميل"
              className="w-17 h-17 rounded-xl object-cover"
            />

            <div>
              <span className="text-sm font-semibold">قم بتحرير صورتك</span>
              <div className="flex items-center gap-2 text-sm text-[var(--main-color)] mt-1">
                <button
                  type="button"
                  onClick={handleDeleteAvatar}
                  disabled={isUploading}
                >
                  حذف
                </button>
                <label className="cursor-pointer">
                  <span>تحديث</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg,image/webp"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
          </div>
        ) : (
          <label className="h-78.5 border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 text-gray-500 text-sm cursor-pointer hover:border-(--main-color) transition-all">
            <ImageIcon />
            <p className="text-[#6C6C6C] font-semibold">
              قم بتحميل صورة ملفك الشخصي.
            </p>
            <span>تنسيق PNG و JPG فقط مسموح.</span>
            <span>يوصى بحجم 500x500 بكسل.</span>
            <input
              type="file"
              className="hidden"
              accept="image/png, image/jpeg,image/webp"
              onChange={handleAvatarUpload}
              disabled={isUploading}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ClientProfileAvatar;
