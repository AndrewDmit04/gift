import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import andrew from './images/andrew.png'
import sundubu from './images/sundubu.jpg'
import rockClimbing from './images/rockClimbing.jpg'
import cutest from './images/cutest.jpeg'
import koda from './images/koda.jpg'
import couple from './images/couple.JPG'
const MobileWrapped = ({startOpacity}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);

  const slides = [
    {
      type: 'intro',
      title: "Your 2024 Wrapped",
      subtitle: "Swipe to see your year in review",
      bgColor: "bg-gradient-to-br from-purple-600 to-pink-500"
    },
    {
      type: 'stat',
      title: "Your Top Lover boy",
      value: "Andrew Dmitrievsky",
      detail: "Over 28,576 hours of being together",
      image: andrew,
      bgColor: "bg-gradient-to-br from-green-400 to-blue-500"
    },
    {
        type: 'stat',
        title: "Top Meal Of The Year",
        value: "순두부",
        detail: "Over 10,000 meals ",
        image: sundubu,
        bgColor: "bg-gradient-to-br from-red-400 to-yellow-500"
      },
    {
        type: 'stat',
        title: "Reunited With Old Hobbies",
        value: "Rock Climbing",
        detail: "Certified Monkey ",
        image: rockClimbing ,
        bgColor: "bg-gradient-to-br from-green-400 to-yellow-500"
      },
      {
        type: 'stat',
        title: "Cutest Photo of The Year",
        value: "My Precios ❤️",
        detail: "So pretty 😍",
        image: cutest,
        bgColor: "bg-gradient-to-br from-green-400 to-purple-500"
      },
    {
      type: 'stat',
      title: "You Got Some New Pets This Year",
      value: "Koda",
      detail: "likes feet, basically a dog",
      image: koda,
      bgColor: "bg-gradient-to-br from-yellow-400 to-red-500"
    },
    {
        type: 'stat',
        title: "Couple Photo Of The Year",
        value: "Blessed ❤️😍",
        detail: "",
        image: couple,
        bgColor: "bg-gradient-to-br from-green-400 to-purple-500"
      },
    {
      type: 'finale',
      title: "Thats a Wrap",
      subtitle: "Merry Christmas Jade I love you!",
      bgColor: "bg-gradient-to-br from-indigo-600 to-purple-500"
    }
  ];

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100 && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (info.offset.x < -100 && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const Slide = ({ data }) => {
    switch (data.type) {
      case 'intro':
        return (
          <div className={`w-full h-full ${data.bgColor} p-6 flex flex-col justify-center items-center text-center`}>
            <h1 className="text-4xl font-bold text-white mb-4">{data.title}</h1>
            <p className="text-lg text-white/80">{data.subtitle}</p>
            <motion.div 
              className="mt-8"
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <p className="text-white/60">Swipe left to begin →</p>
            </motion.div>
          </div>
        );

      case 'stat':
        return (
          <div className={`w-full h-full ${data.bgColor} p-6 flex flex-col justify-between`}>
            <h2 className="text-3xl font-bold text-white mb-4">{data.title}</h2>
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            <div className="relative w-48 h-80">
                <img 
                  src={data.image} 
                  alt={data.value} 
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg" />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">{data.value}</h3>
                <p className="text-lg text-white/80">{data.detail}</p>
              </div>
            </div>
          </div>
        );

      case 'finale':
        return (
          <div className={`w-full h-full ${data.bgColor} p-6 flex flex-col justify-center items-center text-center`}>
            <h1 className="text-4xl font-bold text-white mb-4">{data.title}</h1>
            <p className='text-white font-bold'>{data.subtitle}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`fixed inset-0 bg-black flex items-center justify-center transition-all duration-300 opacity-${startOpacity}`}>
      <div className="w-full h-full max-w-md mx-auto relative overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            style={{ x, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <Slide data={slides[currentSlide]} />
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Swipe hint overlay */}
        {currentSlide < slides.length - 1 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="h-full flex items-center">
              <motion.div
                className="w-full h-full bg-gradient-to-l from-white/10 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileWrapped;