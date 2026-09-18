import { ResetForm } from "../components/reset_password";
import { AuthHeader, AuthSidebar } from "../components/ui";

export default async function ResetPasswordPage({ searchParams }) {
  const { token, email } = await searchParams;

  return (
    <section className="flex h-screen">
      <AuthSidebar />

      <div className="flex w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <AuthHeader
            title={"غير كلمة المرور الخاصة بك"}
            subtitle={
              "حان الوقت لإعادة تعيين كلمة المرور الخاصة بك، تذكر أن لا تنس كتابتها في الملاحظات!"
            }
          />
          <ResetForm token={token} email={email} />
        </div>
      </div>
    </section>
  );
}
