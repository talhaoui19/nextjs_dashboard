import Image from "next/image";

const AuthSidebar = () => {
  return (
    <div className="w-1/2 bg-[#00000033]">
      <div className="mt-11 mr-11">
        <Image
          src={
            "https://res.cloudinary.com/dzvf36zth/image/upload/v1749665709/Logo_2_kf26fh.png"
          }
          width={60}
          height={60}
          alt="Auth Sidebar Logo"
        />
      </div>
    </div>
  );
};

export default AuthSidebar;
