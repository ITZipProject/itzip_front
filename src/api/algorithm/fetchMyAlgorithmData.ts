import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface AlgorithmData {
  userId: number | null;
  username: string;
  rating: number | null;
  rank: number;
  profileImageUrl: string;
  solvedClass: number | null;
  tier: number;
}

export const useFetchMyAlgorithmData = (): AlgorithmData => {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const [rank, setRank] = useState<number>(0);
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [solvedClass, setSolvedClass] = useState<number | null>(null);
  const [tier, setTier] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.39.78.0:8080/api/algorithm/user?userId=8');
        const data = response.data.data.solvedacUser;
        setUserId(data.userId);
        setUsername(data.username);
        setRating(data.rating);
        setRank(data.rank);
        setProfileImageUrl(data.profileImageUrl);
        setSolvedClass(data.solvedClass);
        setTier(data.tier);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchData();
  }, []);

  return {
    userId,
    username,
    rating,
    rank,
    profileImageUrl,
    solvedClass,
    tier,
  };
};
