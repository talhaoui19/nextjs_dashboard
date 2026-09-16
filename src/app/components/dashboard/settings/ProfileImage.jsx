"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfileImage = ({ image }) => {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentImage, setCurrentImage] = useState(image);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

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

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const cloudinaryData = await cloudinaryResponse.json();

      if (!cloudinaryData.secure_url) {
        throw new Error("فشل الحصول على رابط الصورة");
      }

      const apiResponse = await fetch("/api/admin/data/image/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: cloudinaryData.secure_url,
        }),
      });

      const apiData = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(apiData.message || "فشل تحديث الصورة");
      }

      setCurrentImage(cloudinaryData.secure_url);
      toast.success("تم تحديث الصورة بنجاح", { id: toastId });
      router.refresh();
    } catch (error) {
      console.error("خطأ:", error);
      toast.error(error.message || "فشل رفع الصورة!", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("جاري حذف الصورة ...");

    try {
      const response = await fetch("/api/admin/data/image/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "فشل حذف الصورة");
      }

      setCurrentImage("");
      toast.success("تم حذف الصورة بنجاح", { id: toastId });
      router.refresh();
    } catch (error) {
      console.error("خطأ:", error);
      toast.error(error.message || "فشل حذف الصورة!", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-6">
      {image ? (
        <img src={currentImage || "/default-avatar.png"} alt="صورة الادمين" />
      ) : (
        <div className="bg-[#F4F6F8] w-16 h-16 rounded-xl"></div>
      )}

      <div className="flex items-center gap-2">
        <label
          className={`--sett-but ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? (
            "جاري رفع الصورة..."
          ) : (
            <>
              <span>رفع صورة جديدة</span>
              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </>
          )}
        </label>

        <button
          type="button"
          onClick={handleDeleteImage}
          disabled={isDeleting || !currentImage}
          className={`--sett-but-out ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isDeleting ? "جاري الحذف..." : "حذف"}
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
