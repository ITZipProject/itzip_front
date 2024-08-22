import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const submitAnswer = async () => {
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  try {
    const response = await axios.post('/cs-quizzes/search', {
      baseURL: apiUrl,
      params: {
        sortBy: 'NEWEST',
        inUserSolved: false,
        page: 0,
        size: 10,
      },
    });
    return response.data.data.content;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw new Error('Failed to fetch quizzes');
  }
};
