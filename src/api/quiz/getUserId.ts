import axios from 'axios';

export const getUserId = async () => {
  try {
    const response = await axios.patch('/user/refreshToken', {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};
