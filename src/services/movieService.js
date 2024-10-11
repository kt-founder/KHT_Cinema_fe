import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com/movies';

export const getMovies = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
