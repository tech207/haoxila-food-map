"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";

type MerchantSettingsClientProps = {
  merchantProfile: {
    name: string;
    district: string;
    address: string;
    description: string;
    email: string;
    qrSecret: string;
  };
};

export function MerchantSettingsClient({ merchantProfile }: MerchantSettingsClientProps) {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(merchantProfile.qrSecret, {
      margin: 1,
      width: 280,
      color: {
        dark: "#18120F",
        light: "#FFFFFF",
      },
    }).then(setQrUrl);
  }, [merchantProfile.qrSecret]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-brand-deep">商家設定</h1>

        <div className="mt-6 grid gap-6">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">店家基本資料</h2>
            <div className="mt-4 grid gap-4">
              <input defaultValue={merchantProfile.name} className="h-11 rounded-2xl border border-stone-200 px-4 text-sm" />
              <input defaultValue={merchantProfile.address} className="h-11 rounded-2xl border border-stone-200 px-4 text-sm" />
              <input defaultValue={merchantProfile.district} className="h-11 rounded-2xl border border-stone-200 px-4 text-sm" />
              <textarea
                defaultValue={merchantProfile.description}
                className="min-h-32 rounded-2xl border border-stone-200 px-4 py-3 text-sm"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-stone-900">帳號設定</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input defaultValue={merchantProfile.email} className="h-11 rounded-2xl border border-stone-200 px-4 text-sm" />
              <input type="password" defaultValue="merchant-password" className="h-11 rounded-2xl border border-stone-200 px-4 text-sm" />
            </div>
          </div>
        </div>
      </section>

      <aside className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-brand-deep">核銷用 QR Code</h2>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          內容包含 `restaurantQrSecret`，可下載給櫃台或店內設備使用。
        </p>

        <div className="mt-6 rounded-[28px] bg-stone-100 p-5 text-center">
          {qrUrl ? (
            <Image
              src={qrUrl}
              alt="Merchant QR Code"
              width={256}
              height={256}
              className="mx-auto size-64 rounded-2xl bg-white p-3"
              unoptimized
            />
          ) : (
            <div className="mx-auto size-64 animate-pulse rounded-2xl bg-stone-200" />
          )}
          <p className="mt-4 break-all text-xs text-stone-500">{merchantProfile.qrSecret}</p>
        </div>

        <a
          href={qrUrl}
          download={`${merchantProfile.name}-redeem-qr.png`}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-brand-accent px-4 text-sm font-medium text-white"
        >
          下載 QR Code
        </a>
      </aside>
    </div>
  );
}
