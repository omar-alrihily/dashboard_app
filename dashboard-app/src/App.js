import React, { useState } from 'react';
import DataFetching from './services/DataFetching';
import transformData from './utils/processOscarData';
import { getLanguageDistribution, getCountryDistribution } from './utils/processOscarData';
import OscarChart from './components/OscarChart';
import TopPerformers from './components/TopPerformers';
import FilterPanel from './components/FilterPanel';
import PieChart from './components/PieChart';

const App = () => {
  const apiUrl = 'api/guK8Sdo'; // Replace with your actual API URL
  const { data, loading, error } = DataFetching({ endpoint: apiUrl });
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'line'
  const [filters, setFilters] = useState({
    searchTerm: '',
    genre: '',
    year: '',
    country: '',
  });

  // Transform data for the chart
  const { labels, nominations, wins } = data ? transformData(data) : { labels: [], nominations: [], wins: [] };

  // Extract unique genres, years, and countries for dropdowns
  const genres = data ? [...new Set(data.flatMap((movie) => movie.genre))] : [];
  const years = data ? [...new Set(data.map((movie) => movie.year))] : [];
  const countries = data ? [...new Set(data.flatMap((movie) => movie.country))] : [];

  // Filter data based on criteria
  const filteredMovies = data
    ? data.filter((movie) => {
        const matchesSearch =
          movie.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) || // Search by title
          (movie.cast || []).some((actor) => actor.toLowerCase().includes(filters.searchTerm.toLowerCase())); // Search by cast
        const matchesGenre = filters.genre ? movie.genre.includes(filters.genre) : true;
        const matchesYear = filters.year ? movie.year === filters.year : true;
        const matchesCountry = filters.country ? movie.country.includes(filters.country) : true;
        return matchesSearch && matchesGenre && matchesYear && matchesCountry;
      })
    : [];

  // Get language and country distribution
  const languageDistribution = getLanguageDistribution(filteredMovies);
  const countryDistribution = getCountryDistribution(filteredMovies);
  

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
      {/* Filter Panel */}
      <FilterPanel
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        genres={genres}
        years={years}
        countries={countries}
        filters={filters}
      />

      {/* Main Content */}
      <div className="flex-1 p-5 text-stone-800">
        <h1 className="text-3xl font-bold mb-5 text-stone-800">Oscar Nominations & Wins</h1>

        {/* Display Top Movies */}
        <TopPerformers data={filteredMovies} type="movies" />

         {/* Chart Type Buttons */}
         <div className="flex gap-3 mt-5">
          <button
            onClick={() => setChartType('bar')}
            className={`px-4 py-2 rounded ${chartType === 'bar' ? 'bg-cyan-700 text-white' : 'bg-gray-200'}`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-4 py-2 rounded ${chartType === 'line' ? 'bg-cyan-700 text-white' : 'bg-gray-200'}`}
          >
            Line Chart
          </button>
        </div>

        {/* Oscar Chart */}
        {data && <OscarChart labels={labels} nominations={nominations} wins={wins} chartType={chartType} />}

        {/* Pie Charts */}
        <div className="flex flex-wrap mt-5">
          <PieChart
            title="Movies by Language"
            labels={languageDistribution.labels}
            data={languageDistribution.data}
            colors={['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']}
          />
           <PieChart
                title="Movies by Country"
                labels={countryDistribution.labels}
                data={countryDistribution.data}
                colors={['#FF9F40', '#FFCD56', '#4BC0C0', '#9966FF', '#C9CBCF']}
              />
         
        </div>

      
      </div>
    </div>
  );
};

export default App;