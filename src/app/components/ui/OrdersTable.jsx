const products = [
  {
    id: 1,
    number: "#4668",
    date: "21 ديسمبر 2022",
    name: "كي فين ديبروين",
    description: "وصف مختصر للمنتج الأول.",
    category: "أحذية",
    image:
      "https://res.cloudinary.com/dzvf36zth/image/upload/v1748291885/Rectangle_6077_sqru1k.png",
    price: "190 جنيه",
    stock: "321",
    paid: true,
  },
  {
    id: 2,
    number: "#4668",
    date: "21 ديسمبر 2022",
    name: "كوبارسي",
    description: "وصف مختصر للمنتج الثاني.",
    category: "أحذية",
    image:
      "https://res.cloudinary.com/dzvf36zth/image/upload/v1748291885/Rectangle_6077_sqru1k.png",
    price: "200 جنيه",
    stock: "69",
    paid: false,
  },
  {
    id: 3,
    number: "#4668",
    date: "21 ديسمبر 2022",
    name: "ماركينيوس",
    description: "وصف مختصر للمنتج الثالث.",
    category: "أحذية",
    image:
      "https://res.cloudinary.com/dzvf36zth/image/upload/v1748291885/Rectangle_6077_sqru1k.png",
    price: "119 جنيه",
    stock: "120",
    paid: true,
  },
  {
    id: 4,
    number: "#4668",
    date: "21 ديسمبر 2022",
    name: " دافيد ألابا",
    description: "وصف مختصر للمنتج الثالث.",
    category: "أحذية",
    image:
      "https://res.cloudinary.com/dzvf36zth/image/upload/v1748291885/Rectangle_6077_sqru1k.png",
    price: "119 جنيه",
    stock: "120",
    paid: true,
  },
  {
    id: 5,
    number: "#4668",
    date: "21 ديسمبر 2022",
    name: " فينسيوس جونيور",
    description: "وصف مختصر للمنتج الثالث.",
    category: "أحذية",
    image:
      "https://res.cloudinary.com/dzvf36zth/image/upload/v1748291885/Rectangle_6077_sqru1k.png",
    price: "119 جنيه",
    stock: "120",
    paid: false,
  },
  {
    id: 6,
    number: "#4668",
    date: "21 ديسمبر 2022",
    name: " دو سانتوس أفيرو",
    description: "وصف مختصر للمنتج الثالث.",
    category: "أحذية",
    image:
      "https://res.cloudinary.com/dzvf36zth/image/upload/v1748291885/Rectangle_6077_sqru1k.png",
    price: "119 جنيه",
    stock: "120",
    paid: false,
  },
  {
    id: 7,
    number: "#4668",
    date: "21 ديسمبر 2022",
    name: " ماركو أسينسيو",
    description: "وصف مختصر للمنتج الثالث.",
    category: "أحذية",
    image:
      "https://res.cloudinary.com/dzvf36zth/image/upload/v1748291885/Rectangle_6077_sqru1k.png",
    price: "119 جنيه",
    stock: "120",
    paid: true,
  },
];

const OrdersTable = () => {
  return (
    <div className="bg-white p-4 rounded-[12px] mt-6">
      <h2 className="text-base font-semibold">الطلبات الأخيرة</h2>
      <div className="overflow-x-auto rounded-lg mt-6">
        <table className="min-w-full table-fixed bg-white text-sm rtl:text-right text-left">
          <thead className="bg-[#F9F9F9] text-gray-700 font-semibold">
            <tr>
              <th className="w-[] px-4 py-2"> رقم الطلب</th>
              <th className="w-[] px-4 py-2 text-sm text-[#6C6C6C] text-start">
                التاريخ
              </th>
              <th className="w-[] px-4 py-2 text-sm text-[#6C6C6C] text-start">
                العميل
              </th>
              <th className="w-[] px-4 py-2 text-sm text-[#6C6C6C] text-start">
                العناصر
              </th>
              <th className="w-[] px-4 py-2 text-sm text-[#6C6C6C] text-start">
                مدفوع
              </th>
              <th className="w-[] px-4 py-2 text-sm text-[#6C6C6C] text-start">
                الإجراء
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {products.map((product) => (
              <tr key={product.id} className="">
                <td className="p-4 text-[var(--main-color)]">
                  {product.number}
                </td>
                <td className="p-4 font-medium">
                  <span className="bg-[#F9F9F9] py-2 px-4 rounded-[6px]">
                    {product.date}
                  </span>
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <span
                    className={`py-2 px-4 rounded-[6px] ${
                      product.paid === true ? "bg-[#e7f7ed]" : "bg-[#FCECD6]"
                    }`}
                  >
                    {`${product.paid === true ? "نعم" : "لا"}`}
                  </span>
                </td>
                <td className="flex items-center gap-2 p-4 space-x-2 rtl:space-x-reverse">
                  <button className="bg-[#6EC8F7] p-[10px] rounded-[10px] cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M12.25 12.8335H1.75C1.51083 12.8335 1.3125 12.6352 1.3125 12.396C1.3125 12.1568 1.51083 11.9585 1.75 11.9585H12.25C12.4892 11.9585 12.6875 12.1568 12.6875 12.396C12.6875 12.6352 12.4892 12.8335 12.25 12.8335Z"
                        fill="white"
                      />
                      <path
                        d="M11.0948 2.03013C9.96317 0.898466 8.85484 0.869299 7.69401 2.03013L6.98817 2.73597C6.92984 2.7943 6.90651 2.88763 6.92984 2.9693C7.37317 4.51513 8.60984 5.7518 10.1557 6.19513C10.179 6.20097 10.2023 6.2068 10.2257 6.2068C10.2898 6.2068 10.3482 6.18347 10.3948 6.1368L11.0948 5.43097C11.6723 4.8593 11.9523 4.30513 11.9523 3.74513C11.9582 3.16763 11.6782 2.60763 11.0948 2.03013Z"
                        fill="white"
                      />
                      <path
                        d="M9.10586 6.72596C8.93669 6.6443 8.77336 6.56263 8.61586 6.4693C8.48752 6.39346 8.36502 6.3118 8.24252 6.2243C8.14336 6.16013 8.02669 6.0668 7.91586 5.97346C7.90419 5.96763 7.86336 5.93263 7.81669 5.88596C7.62419 5.72263 7.40836 5.51263 7.21586 5.2793C7.19836 5.26763 7.16919 5.2268 7.12836 5.1743C7.07002 5.1043 6.97086 4.98763 6.88336 4.85346C6.81336 4.76596 6.73169 4.63763 6.65586 4.5093C6.56252 4.3518 6.48086 4.1943 6.39919 4.03096C6.29211 3.80152 5.99097 3.73335 5.81192 3.9124L2.53169 7.19263C2.45586 7.26846 2.38586 7.4143 2.36836 7.51346L2.05336 9.74763C1.99502 10.1443 2.10586 10.5176 2.35086 10.7685C2.56086 10.9726 2.85252 11.0835 3.16752 11.0835C3.23752 11.0835 3.30752 11.0776 3.37752 11.066L5.61752 10.751C5.72252 10.7335 5.86836 10.6635 5.93836 10.5876L9.224 7.30198C9.39947 7.12652 9.33354 6.82463 9.10586 6.72596Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  <button className="bg-[#EB2727] p-[10px] rounded-[10px] cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M12.291 3.05067C11.3518 2.95734 10.4126 2.88734 9.46763 2.83484V2.829L9.3393 2.07067C9.2518 1.534 9.12347 0.729004 7.75847 0.729004H6.23013C4.87097 0.729004 4.74263 1.499 4.6493 2.06484L4.5268 2.8115C3.9843 2.8465 3.4418 2.8815 2.8993 2.934L1.7093 3.05067C1.4643 3.074 1.2893 3.28984 1.31263 3.529C1.33597 3.76817 1.54597 3.94317 1.79097 3.91984L2.98097 3.80317C6.03763 3.49984 9.11763 3.6165 12.2093 3.92567C12.2268 3.92567 12.2385 3.92567 12.256 3.92567C12.4776 3.92567 12.6701 3.7565 12.6935 3.529C12.711 3.28984 12.536 3.074 12.291 3.05067Z"
                        fill="white"
                      />
                      <path
                        d="M11.2175 4.7485C11.0775 4.60266 10.885 4.521 10.6867 4.521H3.31335C3.11502 4.521 2.91668 4.60266 2.78252 4.7485C2.64835 4.89433 2.57252 5.09266 2.58418 5.29683L2.94585 11.2818C3.01002 12.1685 3.09168 13.2768 5.12752 13.2768H8.87252C10.9083 13.2768 10.99 12.1743 11.0542 11.2818L11.4158 5.30266C11.4275 5.09266 11.3517 4.89433 11.2175 4.7485ZM7.96835 10.3543H6.02585C5.78668 10.3543 5.58835 10.156 5.58835 9.91683C5.58835 9.67766 5.78668 9.47933 6.02585 9.47933H7.96835C8.20752 9.47933 8.40585 9.67766 8.40585 9.91683C8.40585 10.156 8.20752 10.3543 7.96835 10.3543ZM8.45835 8.021H5.54168C5.30252 8.021 5.10418 7.82266 5.10418 7.5835C5.10418 7.34433 5.30252 7.146 5.54168 7.146H8.45835C8.69752 7.146 8.89585 7.34433 8.89585 7.5835C8.89585 7.82266 8.69752 8.021 8.45835 8.021Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
