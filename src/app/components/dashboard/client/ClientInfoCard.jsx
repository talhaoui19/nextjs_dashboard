const ClientInfoCard = ({ client }) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-base font-semibold mb-4">معلومات العميل</h2>

      <div className="flex items-start gap-3">
        {client.avatar ? (
          <img
            src={client.avatar}
            alt="client avater"
            className="w-14 h-14 rounded-xl"
          />
        ) : (
          <div className="bg-[#F4F6F8] w-14 h-14 rounded-xl"></div>
        )}
        <div>
          <span className="text-sm font-semibold">{client.clientName}</span>
          <p className="text-[#6C6C6C]">{client.email}</p>
        </div>
      </div>
      <div className="space-x-3 mt-4">
        <span className="text-[#9A9A9A]">اسم المستخدم</span>
        <span className="text-[#9A9A9A]">:</span>
        <span>{client.email.split(5)}</span>
      </div>
      <div className="space-x-3 mt-2">
        <span className="text-[#9A9A9A]">الولاية </span>
        <span className="text-[#9A9A9A]">:</span>
        <span>{client.wilaya}</span>
      </div>
      <div className="space-x-3 mt-2">
        <span className="text-[#9A9A9A]">رقم الهاتف </span>
        <span className="text-[#9A9A9A]">:</span>

        {client.phone ? (
          <span> {client.phone} </span>
        ) : (
          <span>لا يوجد رقم هاتف حاليا</span>
        )}
      </div>
      <div className="space-x-3 mt-2">
        <span className="text-[#9A9A9A]">العنوان </span>
        <span className="text-[#9A9A9A]">:</span>
        {client.address ? (
          <span>{client.address} </span>
        ) : (
          <span>لا يوجد عنوان حاليا</span>
        )}
      </div>
      <div className="w-full h-[1px] bg-[#D9D9D9] mt-6" />
      <div className="flex items-center gap-18 mt-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-[#232323]">آخر طلب</h2>
          <p className="text-base text-[#9A9A9A]">منذ 7 أيام</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-[#232323]">مسجل </h2>
          <p className="text-base text-[#9A9A9A]">
            يوم {""}
            {new Date(client.createdAt).toLocaleDateString("ar-DZ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientInfoCard;
