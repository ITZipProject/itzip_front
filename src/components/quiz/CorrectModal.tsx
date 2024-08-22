// 'use client';

// import React, { useState } from 'react';

// interface ModalProps {
//   onClose: () => void;
// }

// const ratings = [
//   { value: -2, label: '문제가 이상해요' },
//   { value: -1, label: '문제가 별로입니다' },
//   { value: 0, label: '보통입니다' },
//   { value: 1, label: '좋은 문제입니다' },
//   { value: 2, label: '문제를 추천합니다' },
// ];

// const CorrectModal: React.FC<ModalProps> = ({ onClose }) => {
//   const [selectedRate, setSelectedRate] = useState<number | null>(null);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="flex flex-col justify-center items-center w-1/2 h-3/4 gap-40 bg-zinc-900 p-7 rounded-3xl shadow-lg">
//         <div className="flex items-center justify-between">
//           <div></div>
//           <h3 className="text-4xl font-bold">정답을 맞추셨네요. 축하드립니다!</h3>
//         </div>
//         <div className="flex justify-center items-center">
//           <div className="flex gap-5">
//             {ratings.map((rating) => (
//               <button
//                 key={rating.value}
//                 className={`border-2 p-2 ${
//                   selectedRate === rating.value ? 'bg-blue-500 text-white' : ''
//                 }`}
//                 onClick={() => setSelectedRate(rating.value)}
//               >
//                 <h3>{rating.label}</h3>
//               </button>
//             ))}
//           </div>
//           <button onClick={onClose(selectedRate)} className="px-2 py-1 bg-blue-500 text-white rounded">
//             제출
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CorrectModal;

import React, { useState } from 'react';

interface ModalProps {
  onClose: (selectedRate: number | null) => void;
}

const ratings = [
  { value: -2, label: '문제가 이상해요' },
  { value: -1, label: '문제가 별로입니다' },
  { value: 0, label: '보통입니다' },
  { value: 1, label: '좋은 문제입니다' },
  { value: 2, label: '문제를 추천합니다' },
];

const CorrectModal: React.FC<ModalProps> = ({ onClose }) => {
  const [selectedRate, setSelectedRate] = useState<number | null>(null);

  const handleSubmit = () => {
    onClose(selectedRate);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-1/2 h-3/4 gap-40 bg-zinc-900 p-7 rounded-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div></div>
          <h3 className="text-4xl font-bold">정답을 맞추셨네요. 축하드립니다!</h3>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex gap-5">
            {ratings.map((rating) => (
              <button
                key={rating.value}
                className={`border-2 p-2 ${
                  selectedRate === rating.value ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => setSelectedRate(rating.value)}
              >
                <h3>{rating.label}</h3>
              </button>
            ))}
          </div>
          <button onClick={handleSubmit} className="px-2 py-1 bg-blue-500 text-white rounded">
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorrectModal;
