import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return (
    <section className="mx-auto w-full max-w-[900px] space-y-8 rounded-2xl border-2 px-[30px] py-spacing-06 shadow-md ">
      {children}
    </section>
  );
};

export default Section;
