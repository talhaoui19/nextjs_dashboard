"use client";
import { useProducts } from "@/app/dashboard/context/ProductsContext";
import { ProductRow } from ".";
import { EmptyTableRow, Pagination } from "../../ui";
import { useSearchPagination } from "@/hooks";

export default function ProductsTable({ searchQuery = "" }) {
  const { products } = useProducts();

  const {
    currentItems: currentProducts,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredItems,
  } = useSearchPagination({
    items: products,
    searchQuery,
    itemsPerPage: 10,

    searchFn: (product, query) => {
      const productName = product.productName.toLowerCase();
      const categorieName = product.categorie.categorieName.toLowerCase();

      return productName.includes(query) || categorieName.includes(query);
    },
  });

  return (
    <>
      <table className="w-full min-w-full bg-white text-[12px] md:text-sm rtl:text-right text-left">
        <thead className="bg-[#F9F9F9] text-gray-700 font-semibold">
          <tr>
            {["#", "منتج", "الفئة", "المخزون", "السعر", "الإجراء"].map(
              (col) => (
                <th
                  key={col}
                  className="px-2 md:px-4 py-2 text-[11px] md:text-sm text-[#6C6C6C] text-start"
                >
                  {col}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-800">
          {currentProducts.length === 0 ? (
            <EmptyTableRow
              colSpan={6}
              message={
                searchQuery.length > 0 ? "لا توجد نتائج" : "لا توجد منتجات بعد."
              }
              description={
                searchQuery.length > 0
                  ? "لم نجد أي منتج يطابق بحثك."
                  : "لم تقم بإنشاء أي منتج حتى الآن."
              }
            />
          ) : (
            currentProducts.map((product, index) => (
              <ProductRow
                key={product._id}
                product={product}
                index={(currentPage - 1) * 10 + index}
              />
            ))
          )}
        </tbody>
      </table>

      {filteredItems.length > 10 && (
        <Pagination
          totalPages={Math.ceil(products.length / 10)}
          totalItems={products.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}
