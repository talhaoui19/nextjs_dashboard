import { CloseIcon } from "@/app/components/icons/close";
import { useCategories } from "@/app/dashboard/context/CategoriesContext";

export default function CategorySelect({
  selectedCategorie,
  onCategorieChange,
}) {
  const { categories } = useCategories();

  const selectedCategorieName = categories.find(
    (cat) => cat._id === selectedCategorie,
  )?.categorieName;

  return (
    <div className="space-y-3">
      {selectedCategorie && (
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1 bg-[#F9F9F9] text-[#9A9A9A] px-4 py-1 rounded-[6px] text-sm">
            {selectedCategorieName}
            <button type="button" onClick={() => onCategorieChange("")}>
              <CloseIcon />
            </button>
          </span>
        </div>
      )}

      <select
        className="--input"
        value={selectedCategorie}
        onChange={(eo) => onCategorieChange(eo.target.value)}
      >
        <option value="">اختر فئة</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.categorieName}
          </option>
        ))}
      </select>
    </div>
  );
}
