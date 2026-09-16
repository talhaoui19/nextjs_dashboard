import { ArrowLeftIcon, ArrowRightIcon } from "@/app/icons";

const OrdersPagination = () => {
  return (
    <div className="flex items-center justify-between mt-6">
      <span className="text-[14px] text-[#6C6C6C]">
        عرض 1 إلى 10 من أصل 256 مدخلاً
      </span>
      <div className="flex items-center gap-5">
        <div className="border border-[#D9D9D9] p-[10px] rounded-[8px]">
          <ArrowLeftIcon />
        </div>
        <div className="bg-[var(--main-color)] px-[18px] py-[8px] rounded-[8px] text-sm text-white">
          1
        </div>
        <span>2</span>
        <span>3</span>
        <span>...</span>
        <span>17</span>
        <div className="border border-[#D9D9D9] p-[10px] rounded-[8px]">
          <ArrowRightIcon />
        </div>
      </div>
      <span className="text-[14px] text-[#6C6C6C]">عرض 10 مدخلات</span>
    </div>
  );
};

export default OrdersPagination;
