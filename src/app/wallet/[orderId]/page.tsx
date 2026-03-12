import { notFound, redirect } from "next/navigation";
import { WalletOtpClient } from "@/components/customer/WalletOtpClient";
import { buildOtpCode, getOrderById } from "@/lib/customer-data";
import { isDemoCustomerLoggedIn } from "@/lib/customer-session";

export default function WalletOrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const isLoggedIn = isDemoCustomerLoggedIn();
  const order = getOrderById(params.orderId);

  if (!isLoggedIn) {
    redirect(`/login?next=/wallet/${params.orderId}`);
  }

  if (!order) {
    notFound();
  }

  const expiresIn = 30 - Math.floor((Date.now() % 30000) / 1000);

  return (
    <WalletOtpClient
      orderId={order.id}
      initialData={{
        orderId: order.id,
        status: order.status,
        otpCode: order.status === "PAID" ? buildOtpCode(order.id) : "------",
        expiresIn,
        storeName: order.storeName,
        ticketTitle: order.ticketTitle,
      }}
    />
  );
}
