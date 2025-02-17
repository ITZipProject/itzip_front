import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return (
    <section className="mx-auto w-full max-w-[700px] space-y-8 rounded-2xl border-2 px-[30px] py-[20px] shadow-md bg-white">
      {children}
    </section>
  );
};

export default Section;
