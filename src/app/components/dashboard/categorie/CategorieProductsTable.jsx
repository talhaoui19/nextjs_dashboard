import { EmptyTableRow } from "../../ui";
import CategorieProductRow from "./CategorieProductRow";

const columns = ["#", "منتج", "الفئة", "المخزون", "السعر", "الإجراء"];

const CategorieProductsTable = ({ products }) => {
  return (
    <>
      <table className="min-w-full bg-white text-sm rtl:text-right text-left">
        <thead className="bg-[#F9F9F9] text-gray-700 font-semibold">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 text-sm text-[#6C6C6C] text-start"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-800">
          {products.length === 0 ? (
            <EmptyTableRow
              colSpan={columns.length}
              message="لا توجد منتجات بعد."
              description="لم تقم بإنشاء أي منتج خاص بهذه الفئة حتى الآن."
            />
          ) : (
            products.map((product, index) => (
              <CategorieProductRow
                key={product._id}
                product={product}
                index={index}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default CategorieProductsTable;
