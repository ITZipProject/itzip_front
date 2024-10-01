import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface AlgorithmData {
  problemId: number;
  title: string;
  level: number;
  acceptedUserCount: number;
  averageTries: number;
}

interface UseFetchAlgorithmDataReturn {
  data: AlgorithmData[];
  isLoading: boolean;
  isError: boolean;
}

export const useFetchAlgorithmData = (): UseFetchAlgorithmDataReturn => {
  const [data, setData] = useState<AlgorithmData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.39.78.0:8080/api/algorithm/problems?userId=8');
        const fetchedData: AlgorithmData[] = response.data.data.problems;
        console.log('Fetched Data:', fetchedData);
        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, isError };
};
