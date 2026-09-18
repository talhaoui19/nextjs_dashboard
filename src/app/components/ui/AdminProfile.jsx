import { ArrowDownIcon } from "../icons";

const AdminProfile = ({ admin }) => {
  if (!admin) return null;
  
  return (
    <div className="flex items-center gap-2">
      {admin.image ? (
        <img
          src={admin.image}
          alt="user image"
          className="w-8 md:w-[48px] h-8 md:h-[48px] rounded-full"
        />
      ) : (
        <div className="bg-[#F4F6F8] w-14 h-14 rounded-xl"></div>
      )}
      <div className="hidden md:flex flex-col">
        <h4 className="text-[12px] md:text-[14px] font-semibold text-[#232323]">
          {admin.firstName} {admin.lastName}
        </h4>
        <span className="text-[#9A9A9A] text-[10px] md:text-[14px]">
          {admin.email}
        </span>
      </div>
      <div className="hidden md:block">
        <ArrowDownIcon />
      </div>
    </div>
  );
};

export default AdminProfile;
