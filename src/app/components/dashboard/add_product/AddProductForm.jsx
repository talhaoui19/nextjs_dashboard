"use client";
import { useState } from "react";
import { AddProductImages } from ".";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../../ui/TextInput";
import { CategorySelect } from "../edit_product";
import Link from "next/link";

const ProductInfoForm = ({ setIsLoading }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    quantity: "",
    price: "",
    discount: "0",
    brand: "بدون ماركة",
    categorie: "",
    images: [],
  });

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setIsLoading(true);

    if (formData.images.length === 0) {
      toast.error("يجب رفع صورة واحدة على الأقل للمنتج !");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "حدث خطأ");
        return;
      }

      toast.success("تم إضافة المنتج بنجاح");
      router.push("/dashboard/products");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      id="add-product-form"
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-6 w-full"
    >
      <div className="flex-1 space-y-6 w-full">
        <div className="bg-white p-6 rounded-xl">
          <h2 className="text-base font-semibold mb-4">المعلومات الأساسية</h2>
          <div className="space-y-4">
            <TextInput
              type="text"
              placeholder="اسم المنتج"
              required
              value={formData.productName}
              onChange={(eo) =>
                setFormData({ ...formData, productName: eo.target.value })
              }
              className="col-span-2"
            />

            <textarea
              rows="4"
              placeholder="الوصف"
              required
              value={formData.description}
              onChange={(eo) =>
                setFormData({ ...formData, description: eo.target.value })
              }
              className="w-full h-71 border text-[15px] border-[#D9D9D9] rounded-xl p-3"
            ></textarea>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl">
          <h2 className="text-base font-semibold mb-4">المخزون والتسعير</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
            <div className="relative">
              <input
                type="number"
                placeholder="الكمية"
                required
                className="--input"
                value={formData.quantity}
                onChange={(eo) =>
                  setFormData({ ...formData, quantity: eo.target.value })
                }
              />
              <span className="absolute left-4 top-3 text-(--main-color) text-sm">
                {" "}
                قطعة
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="السعر"
                required
                value={formData.price}
                onChange={(eo) =>
                  setFormData({ ...formData, price: eo.target.value })
                }
                className="--input"
              />
              <span className="absolute left-4 top-3 text-(--main-color) text-sm">
                دينار جزائري
              </span>
            </div>
            <div>
              <select
                required
                value={formData.discount}
                onChange={(eo) =>
                  setFormData({ ...formData, discount: eo.target.value })
                }
                className="--input"
              >
                <option value="" disabled>
                  الخصم
                </option>
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
                required
                value={formData.brand}
                onChange={(eo) =>
                  setFormData({ ...formData, brand: eo.target.value })
                }
                className="border-[#D9D9D9] --input"
              >
                <option value="" disabled>
                  الماركة
                </option>
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
            className="block text-sm text-(--main-color) mt-6"
          >
            اضافة فئة جديدة
          </Link>
        </div>
      </div>

      <AddProductImages
        images={formData.images}
        onImagesChange={(images) => setFormData({ ...formData, images })}
      />
    </form>
  );
};

export default ProductInfoForm;
