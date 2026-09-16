import { SearchIcon } from "@/app/icons";

const OrdersSearchBar = () => {
  return (
    <div className="relative">
      <div className="absolute right-4 top-7">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="البحث في الطلبات"
        className="border border-[#D9D9D9] mt-4 text-[#9A9A9A] placeholder:pb-2 w-full h-[42px] rounded-[12px] text-[14px] pr-[45px]"
      />
    </div>
  );
};

export default OrdersSearchBar;
