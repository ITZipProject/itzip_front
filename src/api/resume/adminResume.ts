/* eslint-disable */

import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function AdminResumeApi() {
  try {
    console.log('Fetching resume data from:', `${apiUrl}/resume`);
    const response = await axios.get(
      `${apiUrl}/resume`
    );
    console.log('Resume API Response:', response.data);
    const data = response.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Resume API Error:', {
        message: error.message,
        status: (error as any).response?.status,
        data: (error as any).response?.data
      });
    }
    throw new Error('Failed to fetch data');
  }
}

export default AdminResumeApi;
