type StepItem = {
  step: string;
  title: string;
  description: string;
};

export function StepDiagram({ items }: { items: StepItem[] }) {
  return (
    <div className="relative grid gap-5 md:grid-cols-4">
      <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-gradient-to-r from-brand-accent/0 via-brand-accent/80 to-brand-accent/0 md:block" />
      {items.map((item) => (
        <div key={item.step} className="relative rounded-[28px] border border-stone-200/80 bg-white p-5 text-center shadow-sm">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-accent text-lg font-bold text-white">
            {item.step}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-brand-deep">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-stone-500">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
