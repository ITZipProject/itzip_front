import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { CategoryType } from '@/data/BlogCategories';

import CarouselIndicator from './CarouselIndicator';

interface CarouselItem {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  category: keyof CategoryType;
  subCategory: string;
  link: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const BlogCarousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  //const carouselRef = useRef<HTMLDivElement>(null);
  const extendedItems = [items[items.length - 1], ...items, items[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        moveToNextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const moveToNextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const moveToPrevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const moveToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(items.length);
      }, 300);
    } else if (currentIndex === items.length + 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 300);
    }
  }, [currentIndex, items.length]);

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    setIsDragging(true);
    setStartX('touches' in e ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!isDragging) return;
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (Math.abs(translateX) > 100) {
      if (translateX > 0) {
        moveToPrevSlide();
      } else {
        moveToNextSlide();
      }
    }
    setTranslateX(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 md:px-4 lg:px-4">
      <div className="h-96 overflow-hidden rounded-xl">
        <div
          className={`flex h-full ${
            isTransitioning ? 'transition-transform duration-300' : ''
          } ease-in-out`}
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {extendedItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="w-full shrink-0">
              <div className="relative size-full">
                <Image src={item.imageUrl} alt={item.title} layout="fill" objectFit="cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                <Link href={item.link}>
                  <div className="absolute bottom-16 left-20 cursor-pointer text-white">
                    <div className="mb-3 flex select-none items-center gap-2">
                      <span className="text-sm font-medium">{item.category}</span>
                      <Image
                        src="/icons/blog/navigate_next_1.4px.svg"
                        alt="Category Separator"
                        width={20}
                        height={20}
                      />
                      <span className="text-sm font-medium">{item.subCategory}</span>
                    </div>
                    <h2 className="mb-6 select-none text-3xl font-bold transition-colors duration-200 hover:text-blue-300">
                      {item.title}
                    </h2>
                    <p className="line-clamp-2 w-80 select-none text-sm font-medium transition-colors duration-200 hover:text-blue-200">
                      {item.content}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CarouselIndicator
        totalItems={items.length}
        currentIndex={
          currentIndex > items.length ? 1 : currentIndex === 0 ? items.length : currentIndex
        }
        onIndicatorClick={moveToSlide}
        onPrevClick={moveToPrevSlide}
        onNextClick={moveToNextSlide}
      />
    </div>
  );
};

export default BlogCarousel;
