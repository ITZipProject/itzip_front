import MakeQuizButton from './MakeQuizButton';

const MyQuizSection = () => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl font-bold">내가 만든 문제</h3>
      <MakeQuizButton />
    </div>
  );
};
export default MyQuizSection;
