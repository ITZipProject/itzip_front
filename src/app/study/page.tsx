import StudyPageLayout from '@/components/layout/quiz/StudyPageLayout';

export default function Study() {
  return (
    <div className="flex w-full flex-col  overflow-auto bg-neutral-800 p-10 text-gray-200 ">
      <div className="flex w-full flex-col gap-10 ">
        <StudyPageLayout />
      </div>
    </div>
  );
}
