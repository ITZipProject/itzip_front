import React from 'react';

interface TitleProps {
  title: string;
}
const Title = ({ title }: TitleProps) => {
  return <h2 className="text-20 font-bold">{title}</h2>;
};

export default Title;
