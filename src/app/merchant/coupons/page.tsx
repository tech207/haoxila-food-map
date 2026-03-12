import { MerchantTicketsManager } from "@/components/merchant/MerchantTicketsManager";
import { getMerchantTickets } from "@/lib/merchant-data";

export const dynamic = "force-dynamic";

export default function MerchantCouponsPage() {
  return <MerchantTicketsManager initialTickets={getMerchantTickets()} />;
}
