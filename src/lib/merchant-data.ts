import { buildOtpCode, formatPrice, orders, stores } from "@/lib/customer-data";

export type MerchantRedeemError = "NOT_FOUND" | "ALREADY_REDEEMED" | "OTP_EXPIRED" | "OTP_INVALID";

export type MerchantRedeemRecord = {
  orderId: string;
  customerName: string;
  ticketTitle: string;
  amount: number;
  redeemedAt: string;
};

export type MerchantTicketRecord = {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  price: number;
  quantity: number;
  sold: number;
  validUntil: string;
  redeemed: number;
  remaining: number;
  status: "ACTIVE" | "PAUSED" | "SOLD_OUT";
};

type TrendPoint = {
  label: string;
  amount: number;
};

export const merchantProfile = {
  name: "港町燒肉所",
  district: "中山區",
  address: "台北市中山區林森北路 210 號",
  description: "主打和牛燒肉與炭火套餐，適合下班聚餐與約會。",
  email: "merchant@haoxila.test",
  qrSecret: "rest_qr_harbor_yakiniku_demo_2026",
};

const activeStore = stores.find((store) => store.id === "harbor-yakiniku") ?? stores[0];

const redemptionStore = new Map<string, MerchantRedeemRecord>(
  orders
    .filter((order) => order.status === "REDEEMED" && order.redeemedAt)
    .map((order) => [
      order.id,
      {
        orderId: order.id,
        customerName: order.customerName,
        ticketTitle: order.ticketTitle,
        amount: order.totalAmount,
        redeemedAt: order.redeemedAt as string,
      },
    ]),
);

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(dateString: string, target: Date) {
  const date = new Date(dateString);

  return (
    date.getFullYear() === target.getFullYear() &&
    date.getMonth() === target.getMonth() &&
    date.getDate() === target.getDate()
  );
}

function isSameMonth(dateString: string, target: Date) {
  const date = new Date(dateString);

  return date.getFullYear() === target.getFullYear() && date.getMonth() === target.getMonth();
}

export function getMerchantTickets(): MerchantTicketRecord[] {
  return activeStore.tickets.map((ticket) => {
    const redeemed = Array.from(redemptionStore.values()).filter((record) => record.ticketTitle === ticket.title).length;
    const remaining = ticket.quantity - ticket.sold;
    const status: MerchantTicketRecord["status"] = remaining <= 0 ? "SOLD_OUT" : "ACTIVE";

    return {
      ...ticket,
      redeemed,
      remaining,
      status,
    };
  });
}

export function getMerchantDashboardData() {
  const now = new Date();
  const records = Array.from(redemptionStore.values());
  const todayCount = records.filter((record) => isSameDay(record.redeemedAt, now)).length;
  const todayPayout = records
    .filter((record) => isSameDay(record.redeemedAt, now))
    .reduce((sum, record) => sum + record.amount, 0);
  const monthAmount = records
    .filter((record) => isSameMonth(record.redeemedAt, now))
    .reduce((sum, record) => sum + record.amount, 0);

  const weeklyTrend: TrendPoint[] = Array.from({ length: 7 }).map((_, index) => {
    const date = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - index)));
    const amount = records
      .filter((record) => isSameDay(record.redeemedAt, date))
      .reduce((sum, record) => sum + record.amount, 0);

    return {
      label: `${date.getMonth() + 1}/${date.getDate()}`,
      amount,
    };
  });

  return {
    todayCount,
    todayPayout,
    monthAmount,
    weeklyTrend,
    recentRedemptions: records
      .sort((left, right) => new Date(right.redeemedAt).getTime() - new Date(left.redeemedAt).getTime())
      .slice(0, 10),
  };
}

export function resolveMerchantOrder(input: string) {
  const keyword = input.trim();
  if (!keyword) {
    return undefined;
  }

  return orders.find((order) => order.id === keyword || order.id.replace("order-", "") === keyword);
}

export function redeemMerchantOrder(orderInput: string, otpCode: string) {
  const order = resolveMerchantOrder(orderInput);

  if (!order) {
    return { ok: false as const, error: "NOT_FOUND" as MerchantRedeemError };
  }

  if (redemptionStore.has(order.id) || order.status === "REDEEMED") {
    return { ok: false as const, error: "ALREADY_REDEEMED" as MerchantRedeemError };
  }

  const expectedOtp = buildOtpCode(order.id);
  const previousOtp = buildOtpCode(order.id, Date.now() - 30000);
  const normalizedOtp = otpCode.trim();

  if (normalizedOtp.length !== 6) {
    return { ok: false as const, error: "OTP_INVALID" as MerchantRedeemError };
  }

  if (normalizedOtp === previousOtp) {
    return { ok: false as const, error: "OTP_EXPIRED" as MerchantRedeemError };
  }

  if (normalizedOtp !== expectedOtp) {
    return { ok: false as const, error: "OTP_INVALID" as MerchantRedeemError };
  }

  const redeemedAt = new Date().toISOString();
  const record: MerchantRedeemRecord = {
    orderId: order.id,
    customerName: order.customerName,
    ticketTitle: order.ticketTitle,
    amount: order.totalAmount,
    redeemedAt,
  };

  redemptionStore.set(order.id, record);
  order.status = "REDEEMED";
  order.redeemedAt = redeemedAt;
  order.redeemedStore = merchantProfile.name;

  return {
    ok: true as const,
    redemption: {
      ...record,
      amountLabel: formatPrice(record.amount),
    },
    dashboard: getMerchantDashboardData(),
  };
}
