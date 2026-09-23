import { AddButton, EmptyTableRow, HeaderSection } from "../../ui";

export default function EmptyMessages() {
  return (
    <section className="flex-1 overflow-y-auto p-3 md:p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
      {" "}
      <HeaderSection title={"المحادثات"} />
      <div className="bg-white p-3 md:p-4 rounded-xl mt-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 mt-3">
          <AddButton
            href={"/dashboard/clients/add_client"}
            text={"اضافة عميل"}
          />
        </div>
        <div className="overflow-x-auto rounded-lg mt-6">
          <table className="w-full min-w-full bg-white text-[12px] md:text-sm rtl:text-right text-left">
            <div className="p-1 bg-[#F9F9F9] text-center text-gray-700 font-semibold">
              قائمة المحادثات فارغة حالياً
            </div>
            <tbody className="divide-y divide-gray-100 text-gray-800">
              <EmptyTableRow
                colSpan={6}
                message="لا يوجد عملاء !"
                description="ابدأ بإضافة عملاء جدد للتواصل معهم"
              />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
