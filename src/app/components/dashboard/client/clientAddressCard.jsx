const ClientAddressCard = ({ shipping }) => {
  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-base font-semibold mb-2">عنوان الشحن</h2>

      <div className="flex items-start gap-3"></div>
      <div className="space-x-3">
        <span className="text-[#9A9A9A]">الاسم </span>
        <span className="text-[#9A9A9A]">:</span>
        <span>{shipping.clientName}</span>
      </div>
      <div className="space-x-3 mt-2">
        <span className="text-[#9A9A9A]">الولاية </span>
        <span className="text-[#9A9A9A]">:</span>
        <span>{shipping.wilaya}</span>
      </div>
      <div className="space-x-3 mt-2">
        <span className="text-[#9A9A9A]">رقم الهاتف </span>
        <span className="text-[#9A9A9A]">:</span>

        {shipping.phone ? (
          <span>{shipping.phone}</span>
        ) : (
          <span>لا يوجد رقم هاتف حاليا</span>
        )}
      </div>
      <div className="space-x-3 mt-2">
        <span className="text-[#9A9A9A]">العنوان </span>
        <span className="text-[#9A9A9A]">:</span>
        {shipping.address ? (
          <span>{shipping.address} </span>
        ) : (
          <span>لا يوجد عنوان حاليا</span>
        )}
      </div>
    </div>
  );
};

export default ClientAddressCard;
