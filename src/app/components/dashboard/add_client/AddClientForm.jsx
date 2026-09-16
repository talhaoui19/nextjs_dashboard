"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ClientProfileAvatar from "./ClientProfileAvatar";

const AddClientForm = ({ setIsLoading }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    password: "",
    confirmPassword: "",
    wilaya: "",
    phone: "",
    address: "",
    shippingClientName: "",
    shippingWilaya: "",
    shippingPhone: "",
    shippingAddress: "",
    avatar: "",
  });

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("كلمة مرور العميل وتأكيدها غير متطابقين !");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/clients/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "حدث خطأ");
      }

      toast.success("تم إضافة العميل بنجاح");
      router.push("/dashboard/clients");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      id="add-client-form"
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-6 w-full"
    >
      <div className="flex-1 space-y-6 w-full">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-base font-semibold mb-4">معلومات العميل</h2>

          <div className="flex gap-2 mt-8">
            <div className="relative w-full">
              <span className="--label"> إسم العميل</span>
              <input
                type="text"
                placeholder="katelaaaau_"
                required
                value={formData.clientName}
                onChange={(eo) =>
                  setFormData({ ...formData, clientName: eo.target.value })
                }
                className="--input"
              />
            </div>
            <div className="relative w-full">
              <span className="--label">البريد الالكتروني</span>
              <input
                type="email"
                placeholder="kateeee@mail.com"
                required
                value={formData.email}
                onChange={(eo) =>
                  setFormData({ ...formData, email: eo.target.value })
                }
                className="--input"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-8">
            <div className="relative w-full">
              <span className="--label"> كلمة مرور العميل</span>
              <input
                type="password"
                placeholder="أدخل كلمة مرور العميل"
                required
                value={formData.password}
                onChange={(eo) =>
                  setFormData({ ...formData, password: eo.target.value })
                }
                className="--input"
              />
            </div>
            <div className="relative w-full">
              <span className="--label"> تأكيد كلمة مرور العميل</span>
              <input
                type="password"
                placeholder="قم بتأكيد كلمة مرور العميل"
                required
                value={formData.confirmPassword}
                onChange={(eo) =>
                  setFormData({ ...formData, confirmPassword: eo.target.value })
                }
                className="--input"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-8">
            <div className="relative w-full">
              <span className="--label">الولاية</span>
              <input
                type="text"
                placeholder="سطيف"
                required
                value={formData.wilaya}
                onChange={(eo) =>
                  setFormData({ ...formData, wilaya: eo.target.value })
                }
                className="--input"
              />
            </div>
            <div className="relative w-full">
              <span className="--label">رقم الهاتف</span>
              <input
                type="text"
                placeholder="+213 555 555 555"
                required
                value={formData.phone}
                onChange={(eo) =>
                  setFormData({ ...formData, phone: eo.target.value })
                }
                className="--input"
              />
            </div>
          </div>

          <div className="relative mt-8">
            <span className="--label">العنوان</span>
            <input
              type="text"
              placeholder="العنوان الكامل"
              required
              value={formData.address}
              onChange={(eo) =>
                setFormData({ ...formData, address: eo.target.value })
              }
              className="--input"
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg mt-6">
          <h2 className="text-base font-semibold mb-4">عنوان الشحن</h2>

          <div className="relative w-full mt-8">
            <span className="--label">اسم المستلم</span>
            <input
              type="text"
              placeholder="كييت"
              required
              value={formData.shippingClientName}
              onChange={(eo) =>
                setFormData({
                  ...formData,
                  shippingClientName: eo.target.value,
                })
              }
              className="--input"
            />
          </div>

          <div className="flex gap-2 mt-8">
            <div className="relative w-full">
              <span className="--label">الولاية</span>
              <input
                type="text"
                placeholder="سطيف"
                required
                value={formData.shippingWilaya}
                onChange={(eo) =>
                  setFormData({
                    ...formData,
                    shippingWilaya: eo.target.value,
                  })
                }
                className="--input"
              />
            </div>
            <div className="relative w-full">
              <span className="--label">رقم الهاتف</span>
              <input
                type="text"
                placeholder="+213 666 666 666"
                value={formData.shippingPhone}
                onChange={(eo) =>
                  setFormData({
                    ...formData,
                    shippingPhone: eo.target.value,
                  })
                }
                className="--input"
              />
            </div>
          </div>

          <div className="relative w-full mt-8">
            <span className="--label">العنوان</span>
            <input
              type="text"
              placeholder="العنوان الكامل"
              required
              value={formData.shippingAddress}
              onChange={(eo) =>
                setFormData({
                  ...formData,
                  shippingAddress: eo.target.value,
                })
              }
              className="--input"
            />
          </div>

          <span className="block text-sm text-(--main-color) mt-6">
            إضافة عنوان شحن جديد
          </span>
        </div>
      </div>

      <ClientProfileAvatar
        avatar={formData.avatar}
        onAvatarChange={(avatarUrl) =>
          setFormData({ ...formData, avatar: avatarUrl })
        }
      />
    </form>
  );
};

export default AddClientForm;
