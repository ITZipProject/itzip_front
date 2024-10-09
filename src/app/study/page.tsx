import StudyPageLayout from '@/components/layout/quiz/StudyPageLayout';

export default function Study() {
  return (
    <div className="flex flex-col w-full  overflow-auto p-10 bg-neutral-800 text-gray-200 ">
      <div className="flex flex-col w-full gap-10 ">
        <StudyPageLayout />
      </div>
    </div>
  );
}
