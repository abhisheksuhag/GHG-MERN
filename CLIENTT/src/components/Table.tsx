// // CLIENT/src/components/Table.tsx

// interface TableProps {
//   data: any[];
// }

// const Table = ({ data }: TableProps) => {
//   if (data.length === 0) return null;

//   const headers = Object.keys(data[0]); // Dynamically get column headers from the first entry

//   return (
//     <table className="table-auto w-full mt-4 border">
//       <thead>
//         <tr>
//           {headers.map((header) => (
//             <th key={header} className="border px-4 py-2">
//               {header}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             {headers.map((header) => (
//               <td key={header} className="border px-4 py-2">
//                 {row[header]}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;







interface TableProps {
  data: any[];
  columns: Array<{ label: string, key: string }>;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  isEditingMode: boolean; // New prop to control the visibility of Edit/Delete buttons
}

const Table = ({ data, columns, onDelete, onEdit, isEditingMode }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg mt-4">
        <thead className="bg-gray-800 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left py-3 px-4">{col.label}</th>
            ))}
            {isEditingMode && <th className="text-left py-3 px-4">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4">{row[col.key]}</td>
              ))}
              {isEditingMode && (
                <td className="py-3 px-4">
                  <button
                    onClick={() => onEdit(index)}
                    className="bg-blue-500 text-white px-3 py-1 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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
