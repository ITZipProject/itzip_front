import { FormProvider } from 'react-hook-form';
import useMultiForm from '@/hooks/quiz/useMultiForm';
import { FirstStep } from '@/components/quiz/multiStep/FirstStep';
import { SecondStep } from '@/components/quiz/multiStep/SecondStep';
import { ThirdStep } from '@/components/quiz/multiStep/ThirdStep';
import useCreateQuiz from '@/hooks/quiz/useCreateQuiz';
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <FormProvider {...formMethods}>
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md relative space-y-4 w-full max-w-lg mx-4">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            X
          </button>

          {stepComponent}

          <div className="flex justify-between mt-4">
            {!isFirstStep && (
              <button
                onClick={back}
                className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                이전
              </button>
            )}
            {isLastStep ? (
              <button
                onClick={handleSubmit(onSubmit)}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                완료
              </button>
            ) : (
              <button
                onClick={next}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                다음
              </button>
            )}
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default MakeQuizModal;
