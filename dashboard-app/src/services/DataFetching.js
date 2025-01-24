import { useState, useEffect } from 'react';
import axios from 'axios';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const useDataFetching = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_API_KEY}&language=en-US`
        );
       // console.log('Fetched Data from TMDB:', response.data.results); // Log the fetched data
        setData(response.data.results); // TMDB API returns data in `results`
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useDataFetching;