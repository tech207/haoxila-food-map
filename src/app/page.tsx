import { ExploreClient } from "@/components/customer/ExploreClient";
import { stores } from "@/lib/customer-data";

export default function RootPage() {
  return <ExploreClient stores={stores} />;
}
