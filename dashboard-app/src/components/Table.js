import React from 'react';

const Table = ({ columns, data, sortBy, sortOrder, onSort }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full mt-5 border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column) => (
              <th
                key={column.key}
                className="p-2 text-left cursor-pointer border-b-2 border-gray-200 hover:bg-gray-100"
                onClick={() => onSort(column.key)}
              >
                <div className="flex items-center">
                  <span>{column.label}</span>
                  {sortBy === column.key && (
                    <span className="ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr 
              key={`${row.title}-${row.year}`} 
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              {columns.map((column) => (
                <td 
                  key={`${row.title}-${row.year}-${column.key}`} 
                  className="p-2"
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;