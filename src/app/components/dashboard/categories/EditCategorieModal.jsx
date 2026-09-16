"use client";
import { CloseIcon } from "@/app/icons";
import { useState } from "react";
import toast from "react-hot-toast";
import TextInput from "../../ui/TextInput";
import { useRouter } from "next/navigation";

const EditCategoryModal = ({
  isEditCategorie,
  setIsEditCategorie,
  categorie,
}) => {
  const router = useRouter();
  const [categorieName, setCategorieName] = useState(
    categorie?.categorieName || "",
  );
  const [isLoading, seIstLoading] = useState(false);
  const [isInputError, setIsInputError] = useState(false);

  const handleSubmit = async () => {
    seIstLoading(true);

    if (categorie.categorieName === categorieName) {
      toast.error("ليس هناك أي تغيير في اسم الفئة .");
      setIsInputError(true);
      seIstLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/categories/${categorie._id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categorieName: categorieName.trim() }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        setIsInputError(true);
        return;
      }

      toast.success("تم تعديل الفئة بنجاح .");
      setIsEditCategorie(false);
      setCategorieName("");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ في الاتصال");
    } finally {
      seIstLoading(false);
    }
  };

  return (
    <section
      className={`fixed inset-0 flex items-center justify-center bg-[#23232333] transition-all duration-300 ${
        isEditCategorie ? "opacity-100 visible" : "opacity-0 invisible"
      } z-50`}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div
          className={`w-[395px] bg-white p-6 rounded-xl transition-all duration-300 ${
            isEditCategorie
              ? "scale-100 translate-y-0"
              : "scale-95 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2>تعديل الفئة </h2>
            <button
              onClick={() => {
                setIsEditCategorie(false);
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
                setIsEditCategorie(false);
              }}
            >
              إلغاء
            </button>
            <button type="button" className="--sett-but" onClick={handleSubmit}>
              {isLoading ? <div className="--spr"></div> : "حفظ"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditCategoryModal;
