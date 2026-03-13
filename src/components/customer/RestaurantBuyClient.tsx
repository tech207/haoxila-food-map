"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type RestaurantBuyClientProps = {
  ticketId: string;
};

export function RestaurantBuyClient({ ticketId }: RestaurantBuyClientProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleBuy = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId }),
      });

      if (!response.ok) {
        throw new Error("建立訂單失敗");
      }

      router.push("/wallet");
      router.refresh();
    } catch {
      setError("建立訂單失敗，請稍後再試。");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleBuy}
        disabled={loading}
        className="mt-8 flex h-12 w-full items-center justify-center rounded-2xl bg-brand-accent text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "處理中..." : "確認購買"}
      </button>
      {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
    </>
  );
}
