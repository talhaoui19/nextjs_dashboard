import { EmailForm } from "../components/forget_password";
import { AuthHeader, AuthSidebar } from "../components/ui";

const ForegtPasswordPage = () => {
  return (
    <section className="flex h-screen">
      <AuthSidebar />

      <div className="flex w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <AuthHeader
            title={"نسيت كلمة السر ؟"}
            subtitle={
              "لا تقلق، في بعض الأحيان يمكن أن ينسى الأشخاص أيضًا، أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور"
            }
          />
          <EmailForm />
        </div>
      </div>
    </section>
  );
};

export default ForegtPasswordPage;
