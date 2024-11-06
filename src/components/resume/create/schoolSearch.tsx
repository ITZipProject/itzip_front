/* eslint-disable */

import SearchSchoolApi from '@/api/resume/searchSchool';
import * as React from 'react';
import Modal from 'react-modal';
import { atom, useAtom } from 'jotai';

interface ISchoolSearchProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

type schoolTypeSelect = string | undefined;
type schoolSearchValue = string | undefined;

export const schoolNameAtom = atom('');

const SchoolSearch: React.FunctionComponent<ISchoolSearchProps> = ({ isOpen, onRequestClose }) => {
  const [schoolTypeSelect, setSchoolTypeSelect] = React.useState<schoolTypeSelect>('대학교');

  const [schoolSearchValue, setSchoolSearchValue] = React.useState('');

  const [schoolName, setSchoolName] = useAtom(schoolNameAtom);

  const [schoolResultArray, setSchoolResultArray] = React.useState([]);

  const onSearch = async () => {
    try {
      const data = await SearchSchoolApi({
        searchValue: schoolSearchValue,
        schoolType: schoolTypeSelect,
      });

      setSchoolResultArray(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div>
        <select onChange={(e) => setSchoolTypeSelect(e.target.value)}>
          <option value="대학교">대학교</option>
          <option value="고등학교">고등학교</option>
          <option value="중학교">중학교</option>
        </select>
      </div>

      <div>
        <h2>학교 검색</h2>
        <input
          type="text"
          placeholder="학교 이름"
          onChange={(e) => setSchoolSearchValue(e.target.value)}
        />
        <button type="button" onClick={onSearch}>
          검색
        </button>
      </div>
      <div>
        {schoolResultArray.map((school, index) => (
          <div key={index} onClick={(e) => setSchoolName(school)}>
            {school}
          </div>
        ))}
      </div>
      <div>
        <button type="button" onClick={onRequestClose}>
          추가
        </button>
      </div>
      <div>
        <button onClick={onRequestClose}>닫기</button>
      </div>
    </Modal>
  );
};

export default SchoolSearch;
