import { MessagesContent } from "@/app/components/dashboard/messages";
import { getClients, getLatestMessages, getMessagesByClient } from "@/lib/data";

export default async function MessagesPage({ searchParams }) {
  const { clientId } = await searchParams;

  const clients = await getClients();
  const latestMessages = await getLatestMessages();

  const sortedClients = [...clients].sort((a, b) => {
    return (
      new Date(
        latestMessages?.find((message) => message._id === b._id)?.createdAt,
      ) -
      new Date(
        latestMessages?.find((message) => message._id === a._id)?.createdAt,
      )
    );
  });

  const selectedClientId = clientId || sortedClients[0]?._id;

  const messages = selectedClientId
    ? await getMessagesByClient(selectedClientId)
    : [];

  return (
    <section className="flex h-screen min-h-0 bg-white animate-fade transition-all duration-300">
      <MessagesContent
        clients={sortedClients}
        messages={messages}
        selectedClientId={selectedClientId}
        latestMessages={latestMessages}
      />
    </section>
  );
}
