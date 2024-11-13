import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

interface AlgorithmData {
  problemId: number;
  title: string;
  level: number;
  acceptedUserCount: number;
  averageTries: number;
}

interface ApiResponse {
  data: {
    problems: AlgorithmData[];
  };
}

const fetchAlgorithmData = async (
  accessToken: string,
  tagId?: number,
): Promise<AlgorithmData[]> => {
  const url = tagId
    ? `${baseApiUrl}/algorithm/problems?tagId=${tagId}`
    : `${baseApiUrl}/algorithm/problems`;

  const response = await axios.get<ApiResponse>(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data.problems;
};

export const useFetchAlgorithmData = (accessToken: string, tagId?: number) => {
  return useQuery<AlgorithmData[], Error>({
    queryKey: ['algorithmData', tagId],
    queryFn: () => fetchAlgorithmData(accessToken, tagId),
    staleTime: 1000 * 60 * 5,
    enabled: !!accessToken && accessToken !== '',
  });
};
