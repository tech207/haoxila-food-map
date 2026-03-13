type Column = {
  key: string;
  label: string;
};

type Row = {
  label: string;
  values: string[];
};

export function CompareTable({ columns, rows }: { columns: Column[]; rows: Row[] }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-stone-50 text-left text-stone-500">
            <tr>
              <th className="px-5 py-4 font-medium">比較項目</th>
              {columns.map((column) => (
                <th key={column.key} className="px-5 py-4 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.label} className={index % 2 === 0 ? "bg-white" : "bg-stone-50/50"}>
                <td className="px-5 py-4 font-medium text-brand-deep">{row.label}</td>
                {row.values.map((value, valueIndex) => (
                  <td key={`${row.label}-${valueIndex}`} className="px-5 py-4 text-stone-600">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
