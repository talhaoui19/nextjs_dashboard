"use client";
import { AddImageIcon, ImageIcon } from "@/app/icons";
import { useState } from "react";
import toast from "react-hot-toast";

const EditProductImages = ({ images, onImagesChange }) => {
  const [mainImage, setMainImage] = useState(images?.[0] || "");

  const handleImageUpload = async (eo) => {
    const files = eo.target.files;

    const toastId = toast.loading("جاري رفع الصورة .....");

    try {
      const uploadedUrls = [];

      for (let file of files) {
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
          uploadedUrls.push(data.secure_url);
        }
      }

      const allImages = [...(images || []), ...uploadedUrls];
      onImagesChange(allImages);
      setMainImage(allImages[0]);
      toast.success("تم رفع الصورة بنجاح .", { id: toastId });
    } catch (error) {
      console.log("Error uploading images:", error);
      toast.error("فشل رفع الصورة !", { id: toastId });
    }
  };
  return (
    <div className="w-full lg:w-1/3 space-y-6">
      <div className="bg-white p-6 rounded-[12px]">
        <h2 className="text-base text-[#232323] font-semibold mb-4">
          صور المنتج
        </h2>

        <div>
          {mainImage ? (
            <img
              alt="صورة المنتج"
              src={mainImage}
              className="w-[310px] h-[310px] rounded-[12px] object-cover"
            />
          ) : (
            ""
          )}

          {images.length === 0 && (
            <label className="h-[314px] border-2 border-dashed border-gray-300 rounded-[16px] p-6 flex flex-col items-center justify-center gap-2 text-gray-500 text-sm cursor-pointer hover:border-[var(--main-color)] transition-all">
              <ImageIcon />
              <p className="text-[#6C6C6C] font-semibold">
                قم بتحميل صورة منتجك.
              </p>
              <span>PNG و JPG فقط مسموح</span>
              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg,image/webp"
                multiple
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        <div className="flex items-center gap-2 mt-4">
          {images.map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={img}
                alt="صورة مصغرة"
                className={`${mainImage === img ? "border-[var(--main-color)]" : "border-gray-300"} w-[73px] h-[73px] object-cover border-2 rounded-[12px] cursor-pointer`}
                onClick={() => setMainImage(img)}
              />
              <button
                type="button"
                onClick={() => {
                  const newImages = images.filter((_, i) => i !== index);
                  onImagesChange(newImages);
                  if (mainImage === img) {
                    setMainImage(newImages[0] || "");
                  }
                }}
                className="absolute -top-2 -right-1 bg-[var(--main-color)] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}

          <label
            className={`block ${images.length === 4 || images.length === 0 ? "hidden" : ""} w-[73px] h-[73px] border-2 border-dashed border-gray-300 rounded-[12px] flex items-center justify-center cursor-pointer hover:border-[var(--main-color)] transition-all`}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <AddImageIcon />
          </label>
        </div>

        {images.length > 0 && (
          <p className="text-sm text-gray-500 mt-2">{images.length}/4</p>
        )}
      </div>
    </div>
  );
};

export default EditProductImages;
