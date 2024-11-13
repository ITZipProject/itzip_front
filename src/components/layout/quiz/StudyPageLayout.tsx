import HeaderSection from './sections/HeaderSection';
import IntroductionSection from './sections/IntroductionSection';
import LastSection from './sections/LastSection';
import StatisticsSection from './sections/StatisticsSection';

const StudyPageLayout = () => {
  return (
    <div className="flex w-full flex-col gap-12 p-4 sm:gap-16 sm:p-6 lg:gap-20 lg:p-8">
      <HeaderSection />
      <StatisticsSection />
      <IntroductionSection />
      <LastSection />
    </div>
  );
};

export default StudyPageLayout;
