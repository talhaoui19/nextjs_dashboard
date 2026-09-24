export default function Avatar({ name }) {
  return (
    <div className="flex items-center justify-center font-bold text-sm text-white bg-linear-to-br from-[#f7b84e] to-[#f76d7d] w-11.5 h-11.5 rounded-full">
      {name?.slice(0, 1)}
    </div>
  );
}
