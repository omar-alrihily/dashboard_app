import React, { useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

const Sidebar = ({ onSearch, onFilterChange, years }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMediaType, setSelectedMediaType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State to control panel visibility

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleMediaTypeChange = (e) => {
    const mediaType = e.target.value;
    setSelectedMediaType(mediaType);
    onFilterChange("media_type", mediaType);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    onFilterChange("year", year);
  };

  const handleRatingChange = (e) => {
    const rating = e.target.value;
    setSelectedRating(rating);
    onFilterChange("rating", rating);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedMediaType("");
    setSelectedYear("");
    setSelectedRating("");
    onSearch("");
    onFilterChange("media_type", "");
    onFilterChange("year", "");
    onFilterChange("rating", "");
  };

  return (
    <>
      {/* Burger Button to Open the Panel */}
      {!isPanelOpen && ( // Only show the burger button if the panel is closed
        <button
          onClick={() => setIsPanelOpen(true)}
          className="lg:hidden mt-6 ml-3 w-9 h-9 p-2 bg-stone-300 text-black rounded shadow z-20 transition-colors"
        >
          <Bars3Icon className="h-6 w-6" /> {/* Open icon */}
        </button>
      )}

      {/* Panel */}
      <div
  className={`fixed w-1/2 lg:w-64 lg:static inset-0 lg:inset-auto bg-stone-200 lg:bg-transparent z-10 transform transition-transform duration-300 ease-in-out ${
    isPanelOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
  }`}
>
  <div className="h-full lg:h-auto p-4 bg-stone-200 border-r border-gray-200">
    {/* Close Button Inside the Panel */}
    <button
      onClick={() => setIsPanelOpen(false)}
      className="lg:hidden absolute top-4 right-4 p-2 bg-stone-300 text-black rounded shadow hover:bg-stone-400 transition-colors"
    >
      <XMarkIcon className="h-6 w-6" /> {/* Close icon */}
    </button>

    {/* Panel Content */}
    <h2 className="text-xl font-semibold mb-6">Filters</h2>

    {/* Search Bar */}
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by title or overview..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
    </div>

    {/* Media Type Dropdown */}
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Media Type</label>
      <select
        value={selectedMediaType}
        onChange={handleMediaTypeChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      >
        <option value="">All Types</option>
        <option value="movie">Movie</option>
        <option value="tv">TV Series</option>
      </select>
    </div>

    {/* Year Dropdown */}
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Year</label>
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

    {/* Rating Dropdown */}
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Rating</label>
      <select
        value={selectedRating}
        onChange={handleRatingChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      >
        <option value="">All Ratings</option>
        <option value="7">Above 7</option>
        <option value="8">Above 8</option>
        <option value="9">Above 9</option>
      </select>
    </div>

    {/* Clear Filters Button */}
    <button
      onClick={clearFilters}
      className="w-full p-2 bg-stone-300 text-black rounded hover:bg-ston-400  hover:text-black focus:outline-none"
    >
      Clear Filters
    </button>
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

export default Sidebar;