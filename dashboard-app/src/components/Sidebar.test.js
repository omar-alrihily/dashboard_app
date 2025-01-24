// Sidebar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';

// Mock the icons (optional, if you don't want to test the icons themselves)
jest.mock('@heroicons/react/24/solid', () => ({
  XMarkIcon: () => <span>XMarkIcon</span>,
  Bars3Icon: () => <span>Bars3Icon</span>,
}));

describe('Sidebar Component', () => {
  const mockOnSearch = jest.fn();
  const mockOnFilterChange = jest.fn();
  const years = [2020, 2021, 2022];

  const renderSidebar = () =>
    render(
      <Sidebar
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
        years={years}
      />
    );

  // Test 1: Renders the Sidebar component
  test('renders the Sidebar component', () => {
    renderSidebar();
    expect(screen.getByTestId('filters-header')).toBeInTheDocument();
  });

  // Test 2: Toggles the panel open and closed
  test('toggles the panel open and closed', () => {
    renderSidebar();

    // Open the panel
    fireEvent.click(screen.getByRole('button', { name: /Bars3Icon/i }));
    expect(screen.getByTestId('filters-header')).toBeInTheDocument();

    // Close the panel
    fireEvent.click(screen.getByRole('button', { name: /XMarkIcon/i }));
    expect(screen.queryByTestId('filters-header')).not.toBeInTheDocument();
  });

  // Test 3: Handles search input changes
  test('handles search input changes', () => {
    renderSidebar();

    // Open the panel
    fireEvent.click(screen.getByRole('button', { name: /Bars3Icon/i }));

    // Type into the search input
    const searchInput = screen.getByPlaceholderText(/Search by title or overview/i);
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    // Check if the callback is called
    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });

  // Test 4: Handles media type filter changes
  test('handles media type filter changes', () => {
    renderSidebar();

    // Open the panel
    fireEvent.click(screen.getByRole('button', { name: /Bars3Icon/i }));

    // Change the media type dropdown
    const mediaTypeDropdown = screen.getByLabelText(/Media Type/i);
    fireEvent.change(mediaTypeDropdown, { target: { value: 'movie' } });

    // Check if the callback is called
    expect(mockOnFilterChange).toHaveBeenCalledWith('media_type', 'movie');
  });

  // Test 5: Handles year filter changes
  test('handles year filter changes', () => {
    renderSidebar();

    // Open the panel
    fireEvent.click(screen.getByRole('button', { name: /Bars3Icon/i }));

    // Change the year dropdown
    const yearDropdown = screen.getByLabelText(/Year/i);
    fireEvent.change(yearDropdown, { target: { value: '2021' } });

    // Check if the callback is called
    expect(mockOnFilterChange).toHaveBeenCalledWith('year', '2021');
  });

  // Test 6: Clears all filters
  test('clears all filters', () => {
    renderSidebar();

    // Open the panel
    fireEvent.click(screen.getByRole('button', { name: /Bars3Icon/i }));

    // Click the clear filters button
    fireEvent.click(screen.getByText(/Clear Filters/i));

    // Check if all filters are reset
    expect(mockOnSearch).toHaveBeenCalledWith('');
    expect(mockOnFilterChange).toHaveBeenCalledWith('media_type', '');
    expect(mockOnFilterChange).toHaveBeenCalledWith('year', '');
    expect(mockOnFilterChange).toHaveBeenCalledWith('rating', '');
  });
});