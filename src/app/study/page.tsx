import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StudyPageLayout from '@/components/layout/quiz/StudyPageLayout';

const queryClient = new QueryClient();
export default function Study() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col w-full  overflow-auto p-10 bg-neutral-900 text-gray-200 ">
        <div className="flex flex-col w-full gap-10 ">
          <StudyPageLayout />
        </div>
      </div>
    </QueryClientProvider>
  );
}
