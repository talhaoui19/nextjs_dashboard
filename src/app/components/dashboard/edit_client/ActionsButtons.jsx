"use client";
import { useRouter } from "next/navigation";

const ActionsButtons = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-end gap-2 bg-white p-[24px]">
      <button
        type="button"
        className="bg-[#F9F9F9] text-[#232323] p-[14px] rounded-[12px]"
        onClick={() => {
          router.push("/dashboard/clients");
        }}
      >
        تجاهل
      </button>
      <button
        type="submit"
        form="update-client-form"
        className="w-[135px] h-[54px] bg-[var(--main-color)] text-white p-[14px] rounded-[12px]"
      >
        {/* {isLoading ? <div className="--spr"></div> : <> حفظ التغييرات</>} */}
        حفظ التغييرات
      </button>
    </div>
  );
};

export default ActionsButtons;
