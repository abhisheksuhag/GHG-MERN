// CLIENT/src/components/Table.tsx

interface TableProps {
    data: {
      sourceId: string;
      site: string;
      sourceDescription: string;
      area: number;
      fuelType: string;
      fuelState: string;
      quantity: number;
      unit: string;
    }[];
  }

  const Table = ({ data }: TableProps) => {
    return (
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Source ID</th>
            <th className="px-4 py-2">Site</th>
            <th className="px-4 py-2">Source Description</th>
            <th className="px-4 py-2">Area (sq ft)</th>
            <th className="px-4 py-2">Fuel Type</th>
            <th className="px-4 py-2">Fuel State</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Units</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} >
              <td className="border px-4 py-2">{row.sourceId}</td>
              <td className="border px-4 py-2">{row.site}</td>
              <td className="border px-4 py-2">{row.sourceDescription}</td>
              <td className="border px-4 py-2">{row.area}</td>
              <td className="border px-4 py-2">{row.fuelType}</td>
              <td className="border px-4 py-2">{row.fuelState}</td>
              <td className="border px-4 py-2">{row.quantity}</td>
              <td className="border px-4 py-2">{row.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  export default Table;
