import axios from 'axios';

interface algorithmData {
  username: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/algorithm`
  : '';

export const fetchAlgorithmData = async (): Promise<algorithmData[]> => {
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }
  const response = await axios.get(apiUrl);
  return response.data;
};
