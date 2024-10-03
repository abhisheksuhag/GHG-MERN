interface CalculateTableProps {
    data: any[];
    columns: Array<{ label: string; key: string }>;
  }
  
  const CalculateTable = ({ data, columns }: CalculateTableProps) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg mt-4">
          <thead className="bg-[#01b0f1] text-white">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="text-left py-3 px-4">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* If data is empty, show "No data available" */}
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-3 px-4">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} className="border-t">
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 px-4">
                      {row[col.key] || '—'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CalculateTable;
  