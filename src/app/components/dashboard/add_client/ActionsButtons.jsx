import Link from "next/link";

const ActionsButtons = ({ isLoading }) => {
  return (
    <div className="flex items-center justify-end gap-2 bg-white p-[24px]">
      <Link
        href={"/dashboard/clients"}
        className="h-[54px] bg-[#F9F9F9] text-[#232323] p-[14px] rounded-[12px]"
      >
        إلغاء
      </Link>
      <button
        type="submit"
        form="add-client-form"
        className="w-[135px] h-[54px] bg-[var(--main-color)] text-white p-[14px] rounded-[12px]"
      >
        {isLoading ? <div className="--spr" /> : "إضافة عميل"}
      </button>
    </div>
  );
};

export default ActionsButtons;
