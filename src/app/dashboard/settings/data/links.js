import { CardsIcon, PasswordIcon, ProfileIcon, ShopIcon } from "../icons";

export const SidebarLinksData = [
  {
    href: "/dashboard/settings",
    label: "المعلومات الشخصية",
    icon: <ProfileIcon />,
  },
  {
    href: "/dashboard/settings/edit_password",
    label: "كلمة المرور",
    icon: <PasswordIcon />,
  },
  {
    href: "",
    label: "معلومات المتجر",
    icon: <ShopIcon />,
  },
  {
    href: "",
    label: "الدفع",
    icon: <CardsIcon />,
  },
];
