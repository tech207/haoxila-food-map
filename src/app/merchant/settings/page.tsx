import { MerchantSettingsClient } from "@/components/merchant/MerchantSettingsClient";
import { merchantProfile } from "@/lib/merchant-data";

export default function MerchantSettingsPage() {
  return <MerchantSettingsClient merchantProfile={merchantProfile} />;
}
