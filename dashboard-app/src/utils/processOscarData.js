const transformData = (movies) => {
  if (!movies) {
    return { labels: [], nominations: [], wins: [] };
  }

  const yearData = {};
  const movieList = Array.isArray(movies) ? movies : [movies];

  movieList.forEach((movie) => {
    if (!movie || typeof movie !== 'object') return;

    const year = movie.year;
    if (!year) return;

    if (!yearData[year]) {
      yearData[year] = { nominations: 0, wins: 0 };
    }

    // Safely count nominations and wins
    if (typeof movie.oscar_nominations === 'number') {
      yearData[year].nominations += movie.oscar_nominations;
    }
    if (typeof movie.oscar_winning === 'number') {
      yearData[year].wins += movie.oscar_winning;
    }
  });

  // Filter out undefined or invalid years before sorting
  const labels = Object.keys(yearData)
    .filter((year) => year && !isNaN(Number(year))) // Ensure year is a valid number
    .sort((a, b) => Number(a) - Number(b)); // Sort years numerically

  const nominations = labels.map((year) => yearData[year].nominations);
  const wins = labels.map((year) => yearData[year].wins);

  return { labels, nominations, wins };
};

export default transformData;