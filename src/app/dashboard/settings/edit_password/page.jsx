import EditPasswordForm from "@/app/components/dashboard/settings/EditPasswordForm";

const Page = () => {
  return (
    <div className="bg-white p-4 rounded-[12px] flex-[2]">
      <span className="text-[18px] font-semibold"> كلمة المرور</span>

      <EditPasswordForm />
    </div>
  );
};

export default Page;
