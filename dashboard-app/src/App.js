import React, { useState } from 'react';
import useDataFetching from './services/DataFetching';
import RatingTrendsChart from './components/RatingTrendsChart';
import TopPerformers from './components/TopPerformers';
import Sidebar from './components/Sidebar'; 
import PieChart from './components/PieChart';

const App = () => {
  const apiUrl = 'trending/all/day'; // TMDB API endpoint for trending movies and TV shows
  const { data, loading, error } = useDataFetching({ endpoint: apiUrl });

  // Log the fetched data to the console
 //  console.log('Fetched Data in App.js:', data);

  const [chartType, setChartType] = useState('line'); // 'bar' or 'line'
  const [filters, setFilters] = useState({
    searchTerm: '',
    media_type: '',
    year: '',
    rating: '',
  });

  // Extract unique years for dropdown
  const years = data
    ? [...new Set(data.map((item) => new Date(item.release_date || item.first_air_date).getFullYear()))]
    : [];

  // Filter data based on criteria
  const filteredMovies = data
    ? data.filter((item) => {
        const matchesSearch =
          (item.title || item.name).toLowerCase().includes(filters.searchTerm.toLowerCase()) || // Search by title or name
          (item.overview || '').toLowerCase().includes(filters.searchTerm.toLowerCase()); // Search by overview
        const matchesMediaType = filters.media_type ? item.media_type === filters.media_type : true;
        const matchesYear = filters.year
          ? new Date(item.release_date || item.first_air_date).getFullYear() === Number(filters.year)
          : true;
        const matchesRating = filters.rating ? item.vote_average >= Number(filters.rating) : true;
        return matchesSearch && matchesMediaType && matchesYear && matchesRating;
      })
    : [];

  // Function to count movies and TV series
  const getMediaTypeCounts = (data) => {
    const mediaTypeCounts = {
      movie: 0,
      tv: 0,
    };

    if (!Array.isArray(data)) return mediaTypeCounts;

    data.forEach((item) => {
      if (item.media_type === 'movie') {
        mediaTypeCounts.movie += 1;
      } else if (item.media_type === 'tv') {
        mediaTypeCounts.tv += 1;
      }
    });

    return mediaTypeCounts;
  };

  // Get counts for movies and TV series
  const mediaTypeCounts = getMediaTypeCounts(filteredMovies);
  const mediaTypeLabels = ['Movies', 'TV Series'];
  const mediaTypeData = [mediaTypeCounts.movie, mediaTypeCounts.tv];
  const mediaTypeColors = ['#295a72', '#e6e7eb']; // Colors for movies and TV series

  // Prepare rating trends data
  const prepareRatingTrendsData = (data) => {
    const yearData = {};

    data.forEach((item) => {
      const year = new Date(item.release_date || item.first_air_date).getFullYear();
      if (!yearData[year]) {
        yearData[year] = { totalRating: 0, count: 0 };
      }
      yearData[year].totalRating += item.vote_average;
      yearData[year].count += 1;
    });

    const labels = Object.keys(yearData).sort();
    const averageRatings = labels.map((year) => (yearData[year].totalRating / yearData[year].count).toFixed(2));

    return { labels, averageRatings };
  };

  const { labels: ratingLabels, averageRatings } = prepareRatingTrendsData(filteredMovies);

  // Handle search and filter changes
  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  if (loading) return <div className="p-5 text-lg">Loading...</div>;
  if (error) return <div className="p-5 text-lg text-red-600">Error: {error.message}</div>;

  return (
    <div className="flex flex-col lg:flex-row bg-stone-300 ">
      {/* Sidebar */}
      <Sidebar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        years={years} // Pass only the years array
      />

      {/* Main Content */}
      <div className="flex-1 p-5 text-stone-800 mt-15">
        <h1 className="text-3xl font-bold mb-5 text-stone-800 text-center">TRENDING MOVIES AND TV SHOWS</h1>

        {/* Display Top Movies */}
        <TopPerformers data={filteredMovies} type="movies" />

       {/* Pie Chart and Rating Trends Chart with Buttons in One Row for Medium and Large Screens */}
<div className="md:flex lg:flex w-full mt-24">
  {/* Pie Chart */}
  <div className="w-full lg:flex-none md:mt-16 md:w-full lg:w-1/3 p-2">
    <PieChart
      title="Movies vs TV Series"
      labels={mediaTypeLabels}
      data={mediaTypeData}
      colors={mediaTypeColors}
    />
  </div>

  {/* Container for Buttons and Rating Trends Chart */}
  <div className="w-full md:w-1/2 lg:w-2/3 p-2">
    {/* Chart Type Buttons */}
    <div className="flex gap-3 justify-center md:justify-center">
      <button
        onClick={() => setChartType('line')}
        className={`px-4 py-2 rounded ${chartType === 'line' ? 'bg-cyan-700 text-white' : 'bg-gray-200'}`}
      >
        Line Chart
      </button>
      <button
        onClick={() => setChartType('bar')}
        className={`px-4 py-2 rounded ${chartType === 'bar' ? 'bg-cyan-700 text-white' : 'bg-gray-200'}`}
      >
        Bar Chart
      </button>
    </div>

    {/* Rating Trends Chart */}
    <div className="mt-10">
      
      <RatingTrendsChart
        labels={ratingLabels}
        nominations={averageRatings}
        wins={[]} 
        chartType={chartType}
      />
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default App;