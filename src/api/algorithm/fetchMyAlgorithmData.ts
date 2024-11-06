/* eslint-disable */
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

interface UserAlgorithmStats {
  username: string;
  rating: number | null;
  rank: number;
  profileImageUrl: string | null;
  solvedClass: number | null;
  tier: number;
}

const fetchUserAlgorithmStats = async (accessToken: string): Promise<UserAlgorithmStats> => {
  const response = await axios.get(`${baseApiUrl}algorithm/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data.solvedacUser;
};

export const useUserAlgorithmStats = (accessToken: string) => {
  return useQuery<UserAlgorithmStats>({
    queryKey: ['algorithmData', accessToken],
    queryFn: () => fetchUserAlgorithmStats(accessToken),
    staleTime: 1000 * 60 * 5,
    enabled: !!accessToken,
  });
};
