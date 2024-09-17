interface TableProps {
  data: any[];
  columns: Array<{ label: string; key: string }>;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  isEditingMode: boolean;
}

const Table = ({ data, columns, onDelete, onEdit, isEditingMode }: TableProps) => {
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
            {isEditingMode && <th className="text-left py-3 px-4">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4">
                  {row[col.key]}
                </td>
              ))}
              {isEditingMode && (
                <td className="py-3 px-4">
                  <button
                    onClick={() => onEdit(index)}
                    className="bg-[#01b0f1] text-white px-3 py-1 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="bg-red-400 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;