"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export const useImageUpload = (onSuccess) => {
  const [isUploading, setIsUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const uploadToCloudinary = async (file) => {
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
    return data.secure_url;
  };

  const handleUpload = async (file, apiEndpoint = null, payload = {}) => {
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading("جاري رفع الصورة ...");

    try {
      const imageUrl = await uploadToCloudinary(file);

      if (apiEndpoint) {
        const dbResponse = await fetch(apiEndpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            image: imageUrl,
          }),
        });

        if (!dbResponse.ok) {
          throw new Error("فشل تحديث قاعدة البيانات");
        }
      }

      setCurrentImage(imageUrl);
      toast.success("تم رفع الصورة بنجاح", { id: toastId });

      if (onSuccess) onSuccess(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("فشل رفع الصورة!", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (apiEndpoint = null, payload = {}) => {
    const toastId = toast.loading("جاري حذف الصورة ...");

    try {
      if (apiEndpoint) {
        const response = await fetch(apiEndpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            image: "",
          }),
        });

        if (!response.ok) {
          throw new Error("فشل حذف الصورة");
        }
      }

      setCurrentImage("");
      toast.success("تم حذف الصورة بنجاح", { id: toastId });

      if (onSuccess) onSuccess("");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("فشل حذف الصورة!", { id: toastId });
    }
  };

  return {
    isUploading,
    currentImage,
    setCurrentImage,
    handleUpload,
    handleDelete,
  };
};
