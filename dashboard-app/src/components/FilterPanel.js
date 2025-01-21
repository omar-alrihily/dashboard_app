import React, { useState } from 'react';

const FilterPanel = ({ onSearch, onFilterChange, genres, years, countries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
    
  };

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    onFilterChange('genre', genre);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    onFilterChange('year', year);
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    onFilterChange('country', country);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="lg:hidden fixed top-4 right-4 p-2 bg-cyan-700 text-white rounded shadow z-20"
      >
        {isPanelOpen ? 'Close Filters' : 'Open Filters'}
      </button>

      {/* Panel */}
      <div
        className={`fixed lg:static inset-0 lg:inset-auto bg-stone-300 lg:bg-transparent z-10 transform transition-transform duration-300 ease-in-out ${isPanelOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="w-64 h-full lg:h-auto p-4 bg-stone-200 border-r border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Genre Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Genre</label>
            <select
              value={selectedGenre}
              onChange={handleGenreChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Country Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isPanelOpen && (
        <div
          onClick={() => setIsPanelOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-0"
        ></div>
      )}
    </>
  );
};

export default FilterPanel;