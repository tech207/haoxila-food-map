import { redirect } from "next/navigation";

export default function LegacyStorePage({
  params,
}: {
  params: { storeId: string };
}) {
  redirect(`/restaurant/${params.storeId}`);
}
