import { CategorieProductsTable } from "@/app/components/dashboard/categorie";
import { HeaderSection, Search } from "@/app/components/ui";
import { getProductsByCategorie } from "@/lib/data/products";

export default async function CategoriePage({ params }) {
  const { id } = await params;
  const { categorie, products } = await getProductsByCategorie(id);

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
      <HeaderSection title={"الفئات"} subtitle={`${categorie.categorieName}`} />

      <div className="bg-white p-4 rounded-xl mt-6">
        <div className="flex items-center justify-between mt-3">
          <Search placeholder={"بحث في الفئة"} />
        </div>
        <div className="overflow-x-auto rounded-lg mt-6">
          <CategorieProductsTable products={products} />
        </div>
      </div>
    </main>
  );
}
