import axios from 'axios';
import { useState, useEffect } from 'react';

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

interface ApiResponse {
  data: {
    problems: AlgorithmData[];
  };
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
          ? `http://3.39.78.0:8080/api/algorithm/problems?&tagId=${tagId}`
          : 'http://3.39.78.0:8080/api/algorithm/problems?';
        const response = await axios.get<ApiResponse>(url);
        const fetchedData: AlgorithmData[] = response.data.data.problems;
        setData(fetchedData);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch((error) => {
      console.error('비동기 처리 중 오류 발생:', error);
    });
  }, [tagId]);

  return { data, isLoading, isError };
};
