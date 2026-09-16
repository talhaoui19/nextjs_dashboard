"use client";
import { CloseIcon } from "@/app/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import TextInput from "../../ui/TextInput";

const AddCategoryModal = ({ isAddCategorie, setIsAddCategorie }) => {
  const router = useRouter();
  const [categorieName, setCategorieName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInputError, setIsInputError] = useState(false);

  const handleAddCategory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/categories/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categorieName: categorieName.trim() }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        setIsInputError(true);
        return;
      }
      toast.success("تمت إضافة الفئة بنجاح");
      setCategorieName("");
      setIsAddCategorie(false);
      router.refresh();
    } catch (error) {
      console.error("Add category error:", error);
      toast.error("حدث خطأ، حاول مرة أخرى");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={`fixed inset-0 flex items-center justify-center bg-[#23232333] transition-all duration-300 ${
        isAddCategorie ? "opacity-100 visible" : "opacity-0 invisible"
      } z-50`}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div
          className={`w-[395px] bg-white p-6 rounded-xl transition-all duration-300 ${
            isAddCategorie
              ? "scale-100 translate-y-0"
              : "scale-95 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2>إضافة فئة جديدة</h2>
            <button
              onClick={() => {
                setIsAddCategorie(false);
              }}
            >
              <CloseIcon />
            </button>
          </div>

          <TextInput
            id="Categorie Name"
            type="text"
            placeholder={"إسم الفئة"}
            value={categorieName}
            onChange={(eo) => setCategorieName(eo.target.value)}
            inputClassName={
              isInputError ? "border-[#E74C3C]" : "border-[#D9D9D9]"
            }
          />

          <div className="flex items-center justify-end gap-2 bg-white mt-6">
            <button
              type="button"
              className="--sett-but-out"
              onClick={() => {
                setIsAddCategorie(false);
              }}
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleAddCategory}
              disabled={isLoading}
              className="--sett-but"
            >
              {isLoading ? <div className="--spr" /> : "  إضافة"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCategoryModal;
