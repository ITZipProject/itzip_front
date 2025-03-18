/* eslint-disable */

import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function DetailResumeApi(id: Number) {
  try {
    console.log(`API 요청 URL: ${apiUrl}/resume/${id}`);
    
    const response = await axios.get(
      `${apiUrl}/resume/${id}`,
    );

    console.log('API 응답 데이터:', response.data);
    const data = response.data;

    return data;
  } catch (error) {
    console.error('API 요청 실패:', {
      message: (error as Error).message,
      status: (error as any).response?.status,
      statusText: (error as any).response?.statusText,
      responseData: (error as any).response?.data
    });
    throw new Error('Failed to fetch data');
  }
}

export default DetailResumeApi;
