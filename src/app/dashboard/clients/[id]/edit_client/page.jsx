import { FormActions, HeaderSection } from "@/app/components/ui";
import { EditClientForm } from "../../../../components/dashboard/edit_client";
import { getClient } from "@/lib/data";

export default async function EditClientPage({ params }) {
  const { id } = await params;
  const client = await getClient(id);
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
        <HeaderSection title={"العملاء"} subtitle={"تعديل عميل"} />
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <EditClientForm client={client} />
        </div>
      </div>
      <FormActions
        formId="update-client-form"
        cancelHref="/dashboard/clients"
        submitText="حفظ التغييرات"
      />
    </>
  );
}
