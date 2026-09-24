import { Avatar } from ".";
import { ArrowDownIcon } from "../icons";

const AdminProfile = ({ admin }) => {
  if (!admin) return null;

  return (
    <div className="flex items-center gap-2">
      {admin.image ? (
        <img
          src={admin.image}
          alt="user image"
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <Avatar name={admin.firstName} />
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
