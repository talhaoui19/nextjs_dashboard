import { CalendarIcon } from "@/app/dashboard/settings/icons";
import {
  CategoriesIcon,
  ChartIcon,
  ClientsIcon,
  LougoutIcon,
  ProductIcon,
  RequestsIcon,
  SettingsIcon,
} from "../icons";

// SIDE BAR DATA
export const SidebarData = [
  {
    href: "/dashboard",
    label: "لوحة المعلومات",
    icon: <ChartIcon />,
  },
  {
    href: "/dashboard/products",
    label: "المنتجات",
    icon: <ProductIcon />,
  },
  {
    href: "/dashboard/clients",
    label: "العملاء",
    icon: <ClientsIcon />,
  },
  {
    href: "/dashboard/categories",
    label: "الفئات",
    icon: <CategoriesIcon />,
  },
  {
    href: "/dashboard/orders",
    label: "الطلبات",
    icon: <RequestsIcon />,
  },
  {
    href: "/dashboard/coupons",
    label: "الكوبونات",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M6.30002 4.875H11.7C14.25 4.875 14.505 6.0675 14.6775 7.5225L15.3525 13.1475C15.57 14.9925 15 16.5 12.375 16.5H5.63252C3.00002 16.5 2.43002 14.9925 2.65502 13.1475L3.33002 7.5225C3.49502 6.0675 3.75002 4.875 6.30002 4.875Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 6V3.375C6 2.25 6.75 1.5 7.875 1.5H10.125C11.25 1.5 12 2.25 12 3.375V6"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.3075 12.7725H6"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/dashboard/messages",
    label: "المحادثات",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.75 15.375H5.25C3 15.375 1.5 14.25 1.5 11.625V6.375C1.5 3.75 3 2.625 5.25 2.625H12.75C15 2.625 16.5 3.75 16.5 6.375V11.625C16.5 14.25 15 15.375 12.75 15.375Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.75 6.75L10.4025 8.625C9.63 9.24 8.3625 9.24 7.59 8.625L5.25 6.75"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
];
export const Settingsinputs = [
  { label: "الاسم الأول", placeholder: "أرفي" },
  { label: "الاسم الثاني", placeholder: "غانتنج" },
  { label: "اسم المستخدم", placeholder: "arfi.ganteng" },
  { label: "البريد الإلكتروني", placeholder: "arfi.ganteng@mail.com" },
  {
    label: "تاريخ الميلاد",
    placeholder: "17 يناير 1997",
    icon: <CalendarIcon />,
    fullWidth: true,
  },
  { label: "البلد", placeholder: "إندونيسيا" },
  { label: "رقم الهاتف", placeholder: "+62 823-2213-2231" },
  {
    label: "العنوان",
    placeholder: "جى رايا كاليجاوى...",
    fullWidth: true,
  },
];
export const SettingsLink = [
  {
    href: "/dashboard/settings",
    label: "الإعدادات",
    icon: <SettingsIcon />,
  },
];

export const Lougout_icon = <LougoutIcon />;
