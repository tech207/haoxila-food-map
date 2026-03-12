import Link from "next/link";

export default function MerchantLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-stone-200 bg-white p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-accent">Merchant Login</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-deep">登入商家系統</h1>
        <p className="mt-3 text-sm leading-6 text-stone-500">目前先提供 demo 入口，後續可接商家帳號認證。</p>
        <Link
          href="/merchant"
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-brand-accent text-sm font-medium text-white"
        >
          進入商家後台
        </Link>
      </div>
    </div>
  );
}
