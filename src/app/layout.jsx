
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "لوحة التحكم",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-arabic">
        <div className="flex h-screen">
          <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
        </div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: '"Almarai", sans-serif',
              color: "#0000009c",
            },
          }}
        />
      </body>
    </html>
  );
}
