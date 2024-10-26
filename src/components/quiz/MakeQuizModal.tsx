/* eslint-disable */
import { useAtom } from 'jotai';
import { FormProvider } from 'react-hook-form';

import { FirstStep } from '@/components/quiz/multiStep/FirstStep';
import { SecondStep } from '@/components/quiz/multiStep/SecondStep';
import { ThirdStep } from '@/components/quiz/multiStep/ThirdStep';
import useCreateQuiz from '@/hooks/quiz/useCreateQuiz';
import useMultiForm from '@/hooks/quiz/useMultiForm';
import { accessTokenAtom } from '@/store/useTokenStore';
import { MakeQuizData } from '@/types/quiz/quiz';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MakeQuizModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { methods, handleCreateQuiz } = useCreateQuiz();
  const { handleSubmit } = methods;

  const formMethods = methods;

  const stepField = [
    ['category', 'difficulty'],
    ['question', 'options', 'answer'],
  ];

  const { next, back, stepComponent, isFirstStep, isLastStep } = useMultiForm(
    [
      <FirstStep key="first-step" errors={undefined} />,
      <SecondStep key="second-step" errors={undefined} />,
      <ThirdStep key="third-step" />,
    ],
    formMethods,
    stepField,
  );

  const onSubmit = (data: MakeQuizData) => {
    handleCreateQuiz(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <FormProvider {...formMethods}>
        <div className="relative mx-4 h-[600px] w-[500px] max-w-lg space-y-4 rounded-lg bg-zinc-800 p-6 shadow-md">
          <button
            className="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            X
          </button>

          {stepComponent}

          <div className="absolute bottom-4 right-6 flex justify-end">
            {!isFirstStep && (
              <button
                onClick={back}
                className="bg-gray-700 hover:bg-gray-600 mr-2 rounded-lg px-4 py-2 text-white"
              >
                이전
              </button>
            )}
            <button
              onClick={isLastStep ? handleSubmit(onSubmit) : next}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {isLastStep ? '완료' : '다음'}
            </button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default MakeQuizModal;
