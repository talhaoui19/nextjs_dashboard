import { MessagesContent } from "@/app/components/dashboard/messages";
import { getClients, getLatestMessages, getMessagesByClient } from "@/lib/data";

export default async function MessagesPage({ searchParams }) {
  const { clientId } = await searchParams;

  const clients = await getClients();

  const selectedClientId = clientId || clients[0]?._id;

  const messages = selectedClientId
    ? await getMessagesByClient(selectedClientId)
    : [];

  const latestMessages = await getLatestMessages();

  return (
    <section className="flex h-screen min-h-0 bg-white animate-fade transition-all duration-300">
      <MessagesContent
        clients={clients}
        messages={messages}
        selectedClientId={selectedClientId}
        latestMessages={latestMessages}
      />
    </section>
  );
}
