import Link from "next/link";

const FormActions = ({
  isLoading = false,
  formId = "",
  cancelHref,
  submitText = "حفظ",
}) => {
  return (
    <div className="flex items-center justify-end gap-2 bg-white p-6">
      <Link
        href={cancelHref}
        className="h-13.5 bg-[#F9F9F9] text-[#232323] p-3.5 rounded-xl"
      >
        إلغاء
      </Link>

      <button
        type="submit"
        form={formId}
        disabled={isLoading}
        className="--add-but"
      >
        {isLoading ? <div className="--spr" /> : submitText}
      </button>
    </div>
  );
};

export default FormActions;
