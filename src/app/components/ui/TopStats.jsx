import { ArrowDownIcon, ArrowUpIcon, MoreIcon } from "@/app/icons";

const TopStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">إجمالي المبيعات</h2>
          <MoreIcon />
        </div>
        <div className="flex items-center justify-between mt-5">
          <span className="text-lg font-semibold">190 الف</span>
          <div>
            <div className="flex  items-center gap-1 justify-end">
              <ArrowUpIcon />
              <span className="text-[#088B3A]">25%</span>
            </div>
            <p className="text-[#9A9A9A] text-sm">مقارنة بشهر ديسمبر 2022</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">متوسط قيمة الطلب </h2>
          <MoreIcon />
        </div>
        <div className="flex items-center justify-between mt-5">
          <span className="text-lg font-semibold">190 جنيه </span>
          <div>
            <div className="flex  items-center gap-1 justify-end">
              <ArrowDownIcon />
              <span className="text-[#ED6C3C]">15%</span>
            </div>
            <p className="text-[#9A9A9A] text-sm">مقارنة بشهر ديسمبر 2022</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold"> إجمالي الطلبات </h2>
          <MoreIcon />
        </div>
        <div className="flex items-center justify-between mt-5">
          <span className="text-lg font-semibold">578 </span>
          <div>
            <div className="flex  items-center gap-1 justify-end">
              <ArrowUpIcon />
              <span className="text-[#088B3A]">44%</span>
            </div>
            <p className="text-[#9A9A9A] text-sm">مقارنة بشهر ديسمبر 2022</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopStats;
