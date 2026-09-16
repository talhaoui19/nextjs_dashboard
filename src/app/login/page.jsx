import { LoginForm, LoginHeader } from "../components/login";
import { AuthSidebar } from "../components/ui";

export default function LoginPage() {
  return (
    <section className="flex h-screen">
      <AuthSidebar />
      <div className="flex w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <LoginHeader />
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
