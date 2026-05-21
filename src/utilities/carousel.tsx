/*
 * =========================== CAROUSEL FEATURES ===========================
 * - Central for the rotating carousel feature used in the advertisements, benefactors and contributors sections.
 */

import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { controlIcons } from "../icons";

export interface CarouselItem {
  id: string | number;
  [key: string]: any;
}

interface CarouselProps<T extends CarouselItem> {
  carouselItemList: T[];
  renderItem: (item: T, glowColor: string) => ReactNode;
  glowColor?: string;
  className?: string;
  minHeight?: string;
  breakpoints?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  autoRotateInterval?: number;
  autoRotate?: boolean;
}

export const Carousel = <T extends CarouselItem>({
  carouselItemList,
  renderItem,
  glowColor = `var(--color-effect-glow-patrons)`,
  className = "",
  minHeight = "460px",
  breakpoints = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  autoRotateInterval = 5000,
  autoRotate = true,
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToDisplay, setItemsToDisplay] = useState(breakpoints.desktop);
  const [isHovered, setIsHovered] = useState(false);
  const CarouselButton = ({
    onClick,
    disabled,
    icon: Icon,
    ariaLabel,
  }: {
    onClick: () => void;
    disabled: boolean;
    icon: React.ElementType;
    ariaLabel: string;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`glow-border p-3 rounded-full bg-site-foreground border border-site-borderOutline text-site-mutedElementColor transition-all shadow-md ${
        disabled
          ? "opacity-30 cursor-not-allowed"
          : "cursor-pointer hover:text-site-baseElementColor"
      }`}
      style={{ "--glow-color": glowColor } as React.CSSProperties}
      aria-label={ariaLabel}
    >
      <Icon size={24} />
    </button>
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsToDisplay(breakpoints.mobile);
      } else if (width < 1024) {
        setItemsToDisplay(breakpoints.tablet);
      } else {
        setItemsToDisplay(breakpoints.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints]);

  const totalPages = Math.max(
    1,
    Math.ceil(carouselItemList.length / itemsToDisplay),
  );

  useEffect(() => {
    if (currentIndex >= totalPages) {
      setCurrentIndex(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentIndex]);

  useEffect(() => {
    if (!autoRotate || isHovered || totalPages <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, autoRotateInterval);

    return () => clearInterval(timer);
  }, [isHovered, totalPages, autoRotate, autoRotateInterval]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleItems = carouselItemList.slice(
    currentIndex * itemsToDisplay,
    currentIndex * itemsToDisplay + itemsToDisplay,
  );

  if (carouselItemList.length === 0) return null;

  const cardMaxWidth = "max-w-[320px] sm:max-w-[340px] md:max-w-[360px]";

  return (
    <div
      className={`w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ minHeight }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${itemsToDisplay}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex justify-center gap-8 h-full flex-wrap sm:flex-nowrap"
          >
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className={`glow-border rounded-2xl h-full w-full ${cardMaxWidth}`}
                style={{ "--glow-color": glowColor } as React.CSSProperties}
              >
                {renderItem(item, glowColor)}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Controls Section */}
      <div className="flex items-center justify-center gap-6 mt-12">
        <CarouselButton
          onClick={handlePrev}
          disabled={totalPages <= 1}
          icon={controlIcons.leftArrow}
          ariaLabel="Previous slide"
        />
        <div className="flex gap-3">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all duration-500 ${index === currentIndex ? "w-12 bg-site-patrons" : "w-2 bg-site-borderOutline hover:bg-site-patrons"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <CarouselButton
          onClick={handleNext}
          disabled={totalPages <= 1}
          icon={controlIcons.rightArrow}
          ariaLabel="Next slide"
        />
      </div>
    </div>
  );
};
