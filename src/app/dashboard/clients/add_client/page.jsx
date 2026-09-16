"use client";
import { FormActions, HeaderSection } from "@/app/components/ui";
import { AddClientForm } from "../../../components/dashboard/add_client";
import { useState } from "react";

const AddClientPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
        <HeaderSection title={"العملاء"} subtitle={"اضافة عميل"} />
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="flex-1 space-y-6">
            <AddClientForm setIsLoading={setIsLoading} />
          </div>
        </div>
      </div>
      <FormActions
        isLoading={isLoading}
        formId="add-client-form"
        cancelHref="/dashboard/clients"
        submitText="إضافة العميل"
      />
    </>
  );
};

export default AddClientPage;
