import React, { useState, useEffect } from 'react';
import Table from './Table';

const TopPerformers = ({ data }) => {
  const [sortBy, setSortBy] = useState('imdb_rating');
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortedData, setSortedData] = useState([]);

  // Columns with new fields
  const columns = [
    { key: 'title', label: 'Movie Title' },
    { key: 'year', label: 'Year' },
    { key: 'imdb_rating', label: 'IMDb Rating' },
    { key: 'oscar_winning', label: 'Oscar Wins' },
    { key: 'oscar_nominations', label: 'Oscar Nominations' },
  ];

  useEffect(() => {
    if (!data || !Array.isArray(data)) {
      setSortedData([]);
      return;
    }

    // Deduplicate data
    const uniqueData = [...new Map(
      data.map((movie) => [`${movie.title}-${movie.year}`, movie])
    ).values()];

    // Sort logic
    const sorted = [...uniqueData].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      // ... (existing sorting logic)
       // Handle undefined or null values
       if (valueA == null || valueB == null) {
        if (valueA == null && valueB == null) return 0;
        if (valueA == null) return sortOrder === 'asc' ? 1 : -1;
        return sortOrder === 'asc' ? -1 : 1;
      }

      // Sort numbers
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      }

      // Sort strings
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
     
    });

  setSortedData(sorted.slice(0, 5));
  }, [data, sortBy, sortOrder]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center mt-10">Top Movies by IMDb Rating</h2>
      <Table
        columns={columns}
        data={sortedData}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={(key) => {
          if (key === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
          } else {
            setSortBy(key);
            setSortOrder('desc');
          }
        }}
      />
    </div>
  );
};

export default TopPerformers;