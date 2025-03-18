/* eslint-disable */

import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type SearchSchoolApiProps = {
  searchValue: string | undefined;
  schoolType: string | undefined;
};

async function SearchSchoolApi({ searchValue, schoolType }: SearchSchoolApiProps) {
  try {
    console.log('API 요청 파라미터:', { searchValue, schoolType });
    
    const response = await axios.get(
      `${apiUrl}/school`,
      {
        params: {
          searchValue: searchValue,
          schoolType: schoolType,
        },
      },
    );

    console.log('API 응답 데이터:', response.data);
    const data = response.data;

    return data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw new Error('Failed to fetch data');
  }
}

export default SearchSchoolApi;
