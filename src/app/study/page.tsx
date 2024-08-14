import AlgorithmPart from '@/components/study/AlgorithmPart';
import QuizPart from '../../components/study/QuizPart';

export default function Study() {
  return (
    <div className="flex flex-col w-full  overflow-auto p-10 bg-neutral-900 text-gray-200 ">
      <div className="flex flex-col w-full gap-10 ">
        <QuizPart />
        <AlgorithmPart />
      </div>
    </div>
  );
}
