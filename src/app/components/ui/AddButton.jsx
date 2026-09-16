import Link from "next/link";
import { AddIcon } from "@/app/icons";

const AddButton = ({ href, text, ...props }) => {
  return (
    <Link href={href ? href : ""}>
      <button
        className="p-3 rounded-xl flex items-center gap-2 text-sm font-semibold bg-[var(--main-color)] text-white cursor-pointer"
        {...props}
      >
        <AddIcon />
        {text}
      </button>
    </Link>
  );
};

export default AddButton;
