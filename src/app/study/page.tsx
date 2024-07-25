import QuizTop from '@/components/study/QuizTop';
import QuizBottom from '@/components/study/QuizBottom';
import AlgorithmTop from '@/components/study/AlgorithmTop';
import AlgorithmBottom from '@/components/study/AlgorithmBottom';

export default function Study() {
  return (
    <div className="flex flex-col w-full  overflow-auto">
      <div className="flex flex-col w-full ">
        <QuizTop />
        <QuizBottom />
      </div>
      <div className="flex flex-col w-full ">
        <AlgorithmTop />
        <AlgorithmBottom />
      </div>
    </div>
  );
}
