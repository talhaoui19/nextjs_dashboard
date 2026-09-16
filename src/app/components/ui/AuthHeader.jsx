"use client";
import { useRouter } from "next/navigation";
import { ArrowleftIcon } from "../icons";

const AuthHeader = ({ title, subtitle }) => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.back()}>
        <ArrowleftIcon />
      </button>

      <h1 className="mt-4 text-3xl font-bold text-[#232323]">{title}</h1>

      <p className="mt-3 text-sm text-[#9A9A9A] leading-6">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
