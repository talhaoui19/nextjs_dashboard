import { ArrowLeftIcon, ArrowRightIcon } from "@/app/icons";

const Pagination = ({ totalPages, totalItems, currentPage, onPageChange }) => {
  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalItems);

  const getPages = () => {
    const pages = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  console.log(getPages());

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-[12px] md:text-sm">
      <span className="text-[12px] md:text-[14px] text-[#6C6C6C] order-1 sm:order-0">
        عرض {startItem} إلى {endItem} من أصل {totalItems} مدخلاً
      </span>

      <div className="flex items-center gap-2 overflow-x-auto order-3 sm:order-0 w-full sm:w-auto justify-center sm:justify-start">
        <button
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
          disabled={currentPage === totalPages}
          className="border border-[#D9D9D9] p-1.5 md:p-2.5 rounded-lg shrink-0 disabled:opacity-50"
        >
          <ArrowLeftIcon />
        </button>

        {getPages().map((page) => (
          <div key={page}>
            {page === "..." ? (
              <span className="px-2">...</span>
            ) : (
              <button
                onClick={() => {
                  onPageChange(page);
                }}
                className={`flex items-center justify-center w-9.5 h-9.5 p-2.5 rounded-lg text-sm transition ${
                  currentPage === page
                    ? "bg-(--main-color) text-white"
                    : "border border-[#D9D9D9] hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}

        <button
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
          className="border border-[#D9D9D9] p-1.5 md:p-2.5 rounded-lg shrink-0 disabled:opacity-50"
        >
          <ArrowRightIcon />
        </button>
      </div>

      <span className="hidden sm:inline text-[12px] md:text-[14px] text-[#6C6C6C] order-2 sm:order-0">
        عرض 10 مدخلات
      </span>
    </div>
  );
};

export default Pagination;
