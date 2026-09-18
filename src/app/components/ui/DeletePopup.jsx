"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DeletePopup = ({
  isDeleting,
  setIsDeleting,
  itemId,
  title = "العنصر",
  itemIdType,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/admin/${itemIdType}/${itemId}/delete`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "حدث خطأ غير معروف");
        return;
      }

      toast.success(data.message);
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error("خطأ في الاتصال");
    } finally {
      setIsLoading(false);
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#23232333] transition-all duration-300 ${
        isDeleting ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div
          className={`w-98.75 rounded-xl bg-white p-6 transition-all duration-300 ${
            isDeleting ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
          }`}
        >
          <div className="flex items-center gap-2 text-(--main-color)">
            <h2 className="font-semibold text-black">حذف {title} ؟</h2>
          </div>

          <p className="mt-3 text-base text-[#9A9A9A]">
            أنت تحاول حذف {title}
            <br />
            هل أنت متأكد أنك تريد الحذف ؟
          </p>

          <div className="mt-6 flex items-center justify-end gap-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setIsDeleting(false)}
              className="--sett-but-out"
            >
              إلغاء
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleDelete}
              className="--sett-but"
            >
              {isLoading ? <div className="--spr"></div> : <>حذف</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
