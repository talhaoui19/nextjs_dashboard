import { FormActions, HeaderSection } from "@/app/components/ui";
import { EditProductForm } from "../../../../components/dashboard/edit_product";
import { getProduct } from "@/lib/data/products";

export default async function EdiProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
        <HeaderSection
          title={"المنتجات"}
          subtitle={`تعديل المنتج ${product.productName}`}
        />
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <EditProductForm product={product} />
        </div>
      </div>
      <FormActions
        formId="update-product-form"
        cancelHref="/dashboard/products"
        submitText="حفظ التغييرات"
      />
    </>
  );
}
