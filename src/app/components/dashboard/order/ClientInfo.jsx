import Link from "next/link";

const ClientInfo = ({ client }) => {
  return (
    <div className="w-full lg:w-1/3 space-y-6">
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-lg font-bold mb-6 text-right">العميل</h3>
        <div className="flex items-center gap-3">
          {client.avatar ? (
            <Link href={`/dashboard/clients/${client._id}`}>
              <img src={client.avatar} alt="client image" />
            </Link>
          ) : (
            <div className="bg-[#F4F6F8] w-14 h-14 rounded-xl"></div>
          )}

          <div className="text-right">
            <p className="font-semibold">{client.clientName}</p>
            <p className="text-[#6C6C6C] text-base">{client.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4">
        <h3 className="text-lg font-bold mb-3 text-right">شخص الاتصال</h3>
        <div className="text-right space-y-1 p-2">
          <p className="text-[#232323]">{client.clientName}</p>
          <p className="text-[#232323]">{client.email}</p>
          <p className="text-[#9A9A9A]">
            {client.phone ? client.phone : "لا يوجد رقم هاتف"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4">
        <h3 className="text-lg font-bold mb-3 text-right">عنوان الشحن</h3>
        <div className="text-right space-y-2">
          <p className="text-[#000000]">{client.shipping.clientName}</p>
          <p className="text-[#232323] text-sm leading-relaxed">
            {client.shipping.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
