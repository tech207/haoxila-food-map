import { MerchantFrame } from "@/components/layout/MerchantFrame";

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MerchantFrame>{children}</MerchantFrame>;
}
