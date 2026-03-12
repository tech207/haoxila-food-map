type RedeemFormProps = {
  orderId: string;
  otpCode: string;
  isPending: boolean;
  onOrderIdChange: (value: string) => void;
  onOtpCodeChange: (value: string) => void;
  onSubmit: () => void;
};

export function RedeemForm({
  orderId,
  otpCode,
  isPending,
  onOrderIdChange,
  onOtpCodeChange,
  onSubmit,
}: RedeemFormProps) {
  return (
    <div className="mt-8 grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-stone-700">Order ID / 短碼</span>
        <input
          type="text"
          value={orderId}
          onChange={(event) => onOrderIdChange(event.target.value)}
          placeholder="例：order-10021 或 10021"
          className="h-12 rounded-2xl border border-stone-200 px-4 text-sm outline-none transition focus:border-brand-accent"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-stone-700">6 位 OTP 動態碼</span>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otpCode}
          onChange={(event) => onOtpCodeChange(event.target.value.replace(/\D/g, ""))}
          placeholder="000000"
          className="h-16 rounded-2xl border border-stone-200 px-4 text-center font-mono text-4xl tracking-[0.35em] outline-none transition focus:border-brand-accent"
        />
      </label>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isPending}
        className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand-accent px-5 text-sm font-medium text-white disabled:opacity-50"
      >
        驗證並核銷
      </button>
    </div>
  );
}
