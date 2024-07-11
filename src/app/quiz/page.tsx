import Quiz from "../../components/quiz/Quiz";
import Filter from "../../components/quiz/Filter";

export default function QuizPage() {
  return (
    <div className="flex w-full h-screen overflow-y-auto bg-white">
      <div className="w-1/3 flex flex-col justify-center items-center sticky top-0">
        <Filter />
      </div>

      <div className="w-2/3 flex flex-col justify-start items-center">
        <Quiz />
      </div>
    </div>
  );
}
