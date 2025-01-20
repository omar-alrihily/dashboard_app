import React, { useState } from 'react';

const Sidebar = ({ onSearch, onFilterChange, genres, years, countries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="fixed lg:relative lg:w-64 bg-gray-50 border-r border-gray-200 h-screen lg:h-auto z-10">
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-4 w-full text-left bg-blue-500 text-white"
      >
        {isMobileMenuOpen ? 'Close Filters' : 'Open Filters'}
      </button>

      {/* Sidebar Content */}
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block p-4`}
      >
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
  );
};

export default Sidebar;