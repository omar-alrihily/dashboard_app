import React, { useState, useEffect } from 'react';
import Table from './Table';

const TopPerformers = ({ data }) => {
  const [sortBy, setSortBy] = useState('vote_average'); // Default sorting by rating
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortedData, setSortedData] = useState([]);

  // Columns with TMDB fields
  const columns = [
    { key: 'name', label: 'Title' }, // Use 'name' for both movies and TV shows
    { key: 'media_type', label: 'Media Type' },
    { key: 'year', label: 'Year' }, // Display only the year
    { key: 'vote_average', label: 'Rating' },
    { key: 'vote_count', label: 'Votes' },
  ];

  useEffect(() => {
    if (!data || !Array.isArray(data)) {
      setSortedData([]);
      return;
    }

    // Normalize data: Use 'name' for both movies and TV shows
    const normalizedData = data.map((item) => {
      const releaseDate = item.release_date || item.first_air_date; // Use 'release_date' for movies and 'first_air_date' for TV shows
      const year = releaseDate ? new Date(releaseDate).getFullYear() : null; // Extract the year

      return {
        ...item,
        name: item.title || item.name, // Use 'title' for movies and 'name' for TV shows
        year, // Add the extracted year
      };
    });

    // Deduplicate data
    const uniqueData = [...new Map(
      normalizedData.map((item) => [`${item.name}-${item.year}`, item])
    ).values()];

    // Sort logic
    const sorted = [...uniqueData].sort((a, b) => {
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

      return 0;
    });

    setSortedData(sorted.slice(0, 5)); // Show top 5 items
  }, [data, sortBy, sortOrder]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center mt-10">Trending Now</h2>
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