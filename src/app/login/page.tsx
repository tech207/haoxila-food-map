import Link from "next/link";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const next = searchParams?.next && searchParams.next.startsWith("/") ? searchParams.next : "/explore";

  return (
    <div className="flex min-h-screen items-center justify-center bg-customer-bg px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-stone-200 bg-white p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-accent">Login</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-deep">登入顧客系統</h1>
        <p className="mt-3 text-sm leading-6 text-stone-500">
          目前先提供 demo 登入流程，用來驗證購票、票夾與 OTP 核銷頁動線。
        </p>
        <Link
          href={`/api/demo-login?next=${encodeURIComponent(next)}`}
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-brand-accent text-sm font-medium text-white"
        >
          以 Demo 顧客登入
        </Link>
      </div>
    </div>
  );
}
