const Table = ({ columns, data }) => {
  return (
    <table className="w-full border rounded-lg overflow-hidden">

      <thead className="bg-gray-100">

        <tr>
          {columns.map((col, i) => (
            <th key={i} className="text-left px-4 py-2 text-sm text-gray-600">
              {col}
            </th>
          ))}
        </tr>

      </thead>

      <tbody>

        {data.map((row, i) => (
          <tr key={i} className="border-t hover:bg-gray-50">

            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2 text-sm">
                {cell}
              </td>
            ))}

          </tr>
        ))}

      </tbody>

    </table>
  );
};

export default Table;