"use client";

import { ClientsList, HeaderSection, MessageInput, MessagesList } from ".";
import { useRouter } from "next/navigation";

export default function MessagesContent({
  clients,
  messages,
  selectedClientId,
  latestMessages,
}) {
  
  const router = useRouter();

  const selectedClient = clients.find(
    (client) => client._id === selectedClientId,
  );

  const handleSelectClient = (client) => {
    router.push(`/dashboard/messages?clientId=${client._id}`);
  };

  return (
    <>
      <ClientsList
        clients={clients}
        selectedClient={selectedClient}
        setSelectedClient={handleSelectClient}
        latestMessages={latestMessages}
      />

      <div className="flex-1 min-w-0 min-h-0 flex flex-col">
        <HeaderSection client={selectedClient} />

        <MessagesList messages={messages} />

        <MessageInput clientId={selectedClient?._id} />
      </div>
    </>
  );
}
