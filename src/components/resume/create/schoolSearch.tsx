import { atom, useAtom } from 'jotai';
import * as React from 'react';
import { FC } from 'react';
import Modal from 'react-modal';

import SearchSchoolApi from '@/api/resume/searchSchool';

interface ISchoolSearchProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const schoolNameAtom = atom('');

const SchoolSearch: FC<ISchoolSearchProps> = ({ isOpen, onRequestClose }) => {
  const [schoolTypeSelect, setSchoolTypeSelect] = React.useState<string>('대학교');
  const [schoolSearchValue, setSchoolSearchValue] = React.useState('');
  const [, setSchoolName] = useAtom(schoolNameAtom);
  const [schoolResultArray, setSchoolResultArray] = React.useState<string[]>([]);

  const onSearch = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await SearchSchoolApi({
        searchValue: schoolSearchValue,
        schoolType: schoolTypeSelect,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setSchoolResultArray(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      border: 'none',
      borderRadius: '12px',
      maxWidth: '500px',
      width: '90%',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      contentLabel="학교 검색"
    >
      <div className="rounded-lg bg-white shadow-lg">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold text-gray-800">학교 검색</h2>
          <button onClick={onRequestClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* 검색 필터 */}
        <div className="space-y-4 p-4">
          <div>
            <select
              onChange={(e) => setSchoolTypeSelect(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="대학교">대학교</option>
              <option value="고등학교">고등학교</option>
              <option value="중학교">중학교</option>
            </select>
          </div>

          {/* 검색바 */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="학교 이름을 입력하세요"
              onChange={(e) => setSchoolSearchValue(e.target.value)}
              className="flex-1 rounded-lg border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={onSearch}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
            >
              검색
            </button>
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="max-h-60 overflow-y-auto border-y p-4">
          {schoolResultArray.map((school, index) => (
            <div
              key={index}
              onClick={() => setSchoolName(school)}
              className="hover:bg-gray-50 cursor-pointer rounded-lg p-3 transition duration-200"
            >
              {school}
            </div>
          ))}
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-2 p-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="hover:bg-gray-100 rounded-lg px-4 py-2 text-gray-600 transition duration-200"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
          >
            추가
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SchoolSearch;
