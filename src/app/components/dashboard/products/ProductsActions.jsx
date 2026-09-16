"use client";

import { useState } from "react";
import { AddButton, Search } from "../../ui";

export default function ProductsActions({}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-3">
      <Search placeholder={"بحث في المنتجات"} />
      <AddButton href={"/dashboard/products/add_product"} text={"اضافة منتج"} />
    </div>
  );
}
