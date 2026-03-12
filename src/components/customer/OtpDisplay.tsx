const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function OtpDisplay({
  otpCode,
  remaining,
}: {
  otpCode: string;
  remaining: number;
}) {
  const progress = CIRCUMFERENCE - (remaining / 30) * CIRCUMFERENCE;

  return (
    <div className="relative grid h-36 w-36 place-items-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={RADIUS} stroke="rgba(255,255,255,0.12)" strokeWidth="8" fill="none" />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          stroke="#f59e0b"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={progress}
        />
      </svg>
      <div>
        <p className="text-5xl font-semibold tracking-[0.3em]">{otpCode}</p>
        <p className="mt-2 text-xs text-white/55">每 30 秒自動更新</p>
      </div>
    </div>
  );
}
