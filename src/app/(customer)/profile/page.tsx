import Link from "next/link";
import { isDemoCustomerLoggedIn } from "@/lib/customer-session";

export default function CustomerProfilePage() {
  const isLoggedIn = isDemoCustomerLoggedIn();

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:px-6 md:py-8">
      <h1 className="text-3xl font-semibold text-brand-deep">我的帳戶</h1>
      {isLoggedIn ? (
        <div className="mt-6 rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-stone-500">目前為 demo 顧客身份</p>
          <p className="mt-2 text-xl font-semibold text-stone-900">顧客：王小美</p>
          <p className="mt-1 text-sm text-stone-500">demo.customer@haoxila.test</p>
          <Link
            href="/api/demo-logout"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl border border-stone-300 px-4 text-sm font-medium text-stone-700"
          >
            登出
          </Link>
        </div>
      ) : (
        <div className="mt-6 rounded-[28px] border border-dashed border-stone-300 bg-white p-10 text-center">
          <p className="text-sm text-stone-500">請先登入後查看票券與個人資訊。</p>
          <Link
            href="/login?next=/profile"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-brand-accent px-4 text-sm font-medium text-white"
          >
            前往登入
          </Link>
        </div>
      )}
    </div>
  );
}
