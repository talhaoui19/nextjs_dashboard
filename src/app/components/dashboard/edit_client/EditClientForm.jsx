"use client";
import { useRouter } from "next/navigation";
import { EditClientProfileAvatar } from ".";
import { useState } from "react";
import toast from "react-hot-toast";

const EditClientForm = ({ client }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    clientName: client?.clientName || "",
    email: client?.email || "",
    wilaya: client?.wilaya || "",
    phone: client?.phone || "",
    address: client?.address || "",
    shippingClientName: client?.shipping.clientName || "",
    shippingWilaya: client?.shipping.wilaya || "",
    shippingPhone: client?.shipping.phone || "",
    shippingAddress: client?.shipping.address || "",
    avatar: client?.avatar || "",
  });

  const handleSubmit = async (eo) => {
    eo.preventDefault();

    const submitBtn = document.querySelector(
      'button[type="submit"][form="update-client-form"]',
    );
    if (submitBtn) submitBtn.innerHTML = '<div class="--spr"></div>';

    if (
      client.clientName == formData.clientName &&
      client.email === formData.email &&
      client.wilaya === formData.wilaya &&
      client.phone === formData.phone &&
      client.address === formData.address &&
      client.shipping.clientName === formData.shippingClientName &&
      client.shipping.wilaya === formData.shippingWilaya &&
      client.shipping.phone === formData.shippingPhone &&
      client.shipping.address === formData.shippingAddress
    ) {
      toast.error("لم يتم أي تغيير في بيانات العميل !");
      submitBtn.textContent = "حفظ التغييرات";
      return;
    }

    try {
      const response = await fetch(`/api/admin/clients/${client._id}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: formData.clientName,
          email: formData.email,
          wilaya: formData.wilaya,
          phone: formData.phone,
          address: formData.address,
          shippingClientName: formData.shippingClientName,
          shippingWilaya: formData.shippingWilaya,
          shippingPhone: formData.shippingPhone,
          shippingAddress: formData.shippingAddress,
          avatar: formData.avatar,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "حدث خطأ");
        return;
      }

      router.push("/dashboard/clients");
      toast.success("تم تحديث العميل بنجاح");
      router.refresh();
    } catch (error) {
      console.log("Error updating product:", error);
      toast.error("حدث خطأ في التحديث");
    } finally {
      if (submitBtn) submitBtn.textContent = "حفظ التغييرات";
    }
  };
  return (
    <form
      id="update-client-form"
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-6 w-full"
    >
      <div className="flex-1 space-y-6">
        <div className="bg-white p-6 rounded-xl">
          <h2 className="text-base font-semibold mb-4">معلومات العميل</h2>

          <div className="flex gap-2 mt-8">
            <div className="relative w-full">
              <span className="--label"> إسم العميل</span>
              <input
                type="text"
                placeholder="katelaaaau_"
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
              <span className="--label">الولاية</span>
              <input
                type="text"
                placeholder="سطيف"
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
              value={formData.address}
              onChange={(eo) =>
                setFormData({ ...formData, address: eo.target.value })
              }
              className="--input"
            />
          </div>
          <span className="block text-sm text-(--main-color) mt-6">
            تعديل كلمة مرور العميل
          </span>
        </div>
        <div className="bg-white p-6 rounded-xl mt-6">
          <h2 className="text-base font-semibold mb-4">عنوان الشحن</h2>

          <div className="relative w-full mt-8">
            <span className="--label">اسم المستلم</span>
            <input
              type="text"
              placeholder="كييت"
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
            تعديل عنوان الشحن
          </span>
        </div>
      </div>

      <EditClientProfileAvatar
        avatar={formData.avatar}
        onAvatarChange={(avatarUrl) =>
          setFormData({ ...formData, avatar: avatarUrl })
        }
      />
    </form>
  );
};

export default EditClientForm;
