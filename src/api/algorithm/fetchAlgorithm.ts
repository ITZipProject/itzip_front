import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://3.39.78.0:8080';

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

export const useFetchAlgorithmData = (tagId?: number): UseFetchAlgorithmDataReturn => {
  const [data, setData] = useState<AlgorithmData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const url = tagId
          ? `http://3.39.78.0:8080/api/algorithm/problems?userId=8&tagId=${tagId}`
          : 'http://3.39.78.0:8080/api/algorithm/problems?userId=8';
        const response = await axios.get(url);
        const fetchedData: AlgorithmData[] = response.data.data.problems;
        console.log('Fetched Data:', fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tagId]);

  return { data, isLoading, isError };
};
