"use client";

import Link from "next/link";
import { CategorySelect, EditProductImages } from ".";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditProductForm = ({ product }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productName: product?.productName || "",
    description: product?.description || "",
    quantity: product?.quantity || "",
    price: product?.price || "",
    discount: product?.discount || "",
    brand: product?.brand || "",
    categorie: product?.categorie?._id || "",
    images: product?.images || [],
  });

  const handleSubmit = async (eo) => {
    eo.preventDefault();

    const submitBtn = document.querySelector(
      'button[type="submit"][form="update-product-form"]',
    );
    if (submitBtn) submitBtn.innerHTML = '<div class="--spr"></div>';

    if (
      product.productName == formData.productName &&
      product.description === formData.description &&
      product.quantity === formData.quantity &&
      product.price === formData.price &&
      product.discount === formData.discount &&
      product.brand === formData.brand &&
      product.categorie._id === formData.categorie
    ) {
      toast.error("لم يتم أي تغيير في بيانات المنتج !");
      submitBtn.textContent = "حفظ التغييرات";
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/products/${product._id}/update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productName: formData.productName,
            description: formData.description,
            quantity: formData.quantity,
            price: formData.price,
            discount: formData.discount,
            brand: formData.brand,
            categorie: formData.categorie,
            images: formData.images,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "حدث خطأ");
        return;
      }

      router.push("/dashboard/products");
      toast.success("تم تحديث المنتج بنجاح");
      router.refresh();
    } catch (error) {
      console.log("Error updating product:", error);
      toast.error("حدث خطأ في التحديث");
    } finally {
      if (submitBtn) submitBtn.textContent = "حفظ التغييرات";
    }
  };

  return (
    <form
      id="update-product-form"
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-6 w-full"
    >
      <div className="flex-1 space-y-6 w-full">
        <div className="bg-white p-6 rounded-xl">
          <h2 className="text-base font-semibold mb-4">المعلومات الأساسية</h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="اسم المنتج"
                value={formData.productName}
                onChange={(eo) =>
                  setFormData({ ...formData, productName: eo.target.value })
                }
                className="--input"
              />
            </div>
            <div>
              <textarea
                rows="4"
                placeholder="الوصف"
                value={formData.description}
                onChange={(eo) =>
                  setFormData({ ...formData, description: eo.target.value })
                }
                className="w-full h-71 text-[15px] border border-[#D9D9D9] rounded-xl p-3"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl">
          <h2 className="text-base font-semibold mb-4">المخزون والتسعير</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
            <div className="relative">
              <input
                type="number"
                placeholder="الكمية"
                value={formData.quantity}
                onChange={(eo) =>
                  setFormData({ ...formData, quantity: eo.target.value })
                }
                className="--input"
              />
              <span className="absolute left-4 top-3 text-[var(--main-color)] text-sm">
                {" "}
                قطعة
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="السعر"
                value={formData.price}
                onChange={(eo) =>
                  setFormData({ ...formData, price: eo.target.value })
                }
                className="--input"
              />
              <span className="absolute left-4 top-3 text-[var(--main-color)] text-sm">
                دينار جزائري
              </span>
            </div>
            <div>
              <select
                value={formData.discount}
                onChange={(eo) =>
                  setFormData({ ...formData, discount: eo.target.value })
                }
                className="--input"
              >
                <option value="لا يتوفر خصم">لا يتوفر خصم</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
                <option value="25">25%</option>
                <option value="50">50%</option>
              </select>
            </div>
            <div>
              <select
                value={formData.brand}
                onChange={(eo) =>
                  setFormData({ ...formData, brand: eo.target.value })
                }
                className="--input"
              >
                <option value="بدون ماركة">بدون ماركة </option>
                <option value="سامسونج">سامسونج</option>
                <option value="ألجي">ألجي</option>
                <option value="ريالمي">ريالمي</option>
                <option value="أنفينيكس">أنفينيكس</option>
                <option value="هواوي">هواوي</option>
                <option value="أبل">أبل</option>
                <option value="هونور">هونور</option>
                <option value="نوكيا">نوكيا</option>
                <option value="أسوس">أسوس </option>
                <option value="أوبو">أوبو</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-base font-semibold mb-4">الفئة </h2>
          <div>
            <CategorySelect
              selectedCategorie={formData.categorie}
              onCategorieChange={(categorieId) =>
                setFormData({ ...formData, categorie: categorieId })
              }
            />
          </div>
          <Link
            href={"/dashboard/categories"}
            className="block text-sm text-[var(--main-color)] mt-6"
          >
            اضافة فئة جديدة
          </Link>
        </div>
      </div>

      <EditProductImages
        images={formData.images}
        onImagesChange={(images) => setFormData({ ...formData, images })}
      />
    </form>
  );
};

export default EditProductForm;
