"use client";
import { FormActions, HeaderSection } from "@/app/components/ui";
import { AddProductForm } from "../../../components/dashboard/add_product";
import { useState } from "react";

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
        <HeaderSection title={"المنتجات"} subtitle={"اضافة منتج"} />
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <AddProductForm setIsLoading={setIsLoading} />
        </div>
      </div>
      <FormActions
        isLoading={isLoading}
        formId="add-product-form"
        cancelHref="/dashboard/products"
        submitText="إضافة المنتج"
      />
    </>
  );
}
