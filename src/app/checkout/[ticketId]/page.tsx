import { notFound, redirect } from "next/navigation";
import { getTicketById } from "@/lib/customer-data";

export default function CheckoutPage({
  params,
}: {
  params: { ticketId: string };
}) {
  const ticket = getTicketById(params.ticketId);

  if (!ticket) {
    notFound();
  }

  redirect(`/restaurant/${ticket.storeId}/buy?ticketId=${ticket.id}`);
}
