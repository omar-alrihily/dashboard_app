import React, { useState, useEffect } from 'react';
import Table from './Table';

const TopPerformers = ({ data }) => {
  const [sortBy, setSortBy] = useState('imdb_rating'); // Default sort by imdb_rating
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [sortedData, setSortedData] = useState([]);

  // Define columns for movies
  const columns = [
    { key: 'title', label: 'Movie Title' },
    { key: 'year', label: 'Year' },
    { key: 'imdb_rating', label: 'IMDb Rating' },
  ];

  // Sort data whenever `data`, `sortBy`, or `sortOrder` changes
  useEffect(() => {
    if (!data || !Array.isArray(data)) {
      setSortedData([]);
      return;
    }

    const sorted = [...data].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

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

      // Fallback: treat as equal
      return 0;
    });

    // Set the sorted data (only the top 5 movies)
    setSortedData(sorted.slice(0, 5));
  }, [data, sortBy, sortOrder]);

  // Handle sorting when a column header is clicked
  const handleSort = (key) => {
    if (key === sortBy) {
      // Toggle sort order if the same column is clicked
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column and default to descending order
      setSortBy(key);
      setSortOrder('desc');
    }
  };

  // Debugging: Log the sorted data
  useEffect(() => {
    console.log('Top 5 movies:', sortedData);
  }, [sortedData]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Top 5 Movies by IMDb Rating</h2>
      <Table
        columns={columns}
        data={sortedData}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
    </div>
  );
};

export default TopPerformers;