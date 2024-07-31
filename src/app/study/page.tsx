import QuizTop from '@/components/study/QuizTop';

export default function Study() {
  return (
    <div className="flex flex-col w-full  overflow-auto p-10">
      <div className="flex flex-col w-full gap-10 ">
        <QuizTop />
      </div>
    </div>
  );
}
