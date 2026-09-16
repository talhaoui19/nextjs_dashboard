"use client";

import { CategoryRow } from ".";
import { EmptyTableRow, Pagination } from "../../ui";
import { useSearchPagination } from "@/hooks";

const CategoriesTable = ({ categories, searchQuery }) => {
  const {
    currentItems: currentCategories,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredItems,
  } = useSearchPagination({
    items: categories,
    searchQuery,
    itemsPerPage: 10,

    searchFn: (categorie, query) => {
      const categorieName = categorie.categorieName.toLowerCase();

      return categorieName.includes(query);
    },
  });

  return (
    <div className="overflow-x-auto rounded-lg mt-6">
      <table className="min-w-full table-auto bg-white text-sm rtl:text-right text-left">
        <thead className="bg-[#F9F9F9] text-gray-700 font-semibold">
          <tr>
            {["#", "الفئة", "عناصر", "الإجراء"].map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 text-sm text-[#6C6C6C] text-start min-w-25"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 text-gray-800">
          {currentCategories.length === 0 ? (
            <EmptyTableRow
              colSpan={4}
              message="لا توجد فئات بعد."
              description="لم تقم بإنشاء أي فئة حتى الآن."
            />
          ) : (
            currentCategories.map((categorie, index) => (
              <CategoryRow
                key={categorie._id}
                categorie={categorie}
                index={(currentPage - 1) * 10 + index}
              />
            ))
          )}
        </tbody>
      </table>

      {filteredItems.length > 10 && (
        <Pagination
          totalPages={totalPages}
          totalItems={categories.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CategoriesTable;
