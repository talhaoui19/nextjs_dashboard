export default function HeaderSection({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-[12px] md:text-[16px] text-[#9A9A9A] mb-4">
        لوحة المعلومات / {title} {subtitle ? `/ ${subtitle}` : ""}
      </h2>
      <span className="text-[18px] md:text-[21px] font-semibold">
        {subtitle ? subtitle : title}
      </span>
    </div>
  );
}
