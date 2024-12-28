import React, { useRef, useEffect, useState } from "react";
import { Snowfall } from "react-snowfall";
import { gsap } from "gsap";
import jade from './images/jade.png'
const MESSAGES = [
  "Hello",
  "Its really cold",
  "We should start a fire",
  "OH NO MY HEART",
  "I NEED TO UNFREEZE IT",
];

const TypeWriter = ({ onComplete, onMessageChange }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [text, setText] = useState("");
  
  useEffect(() => {

    if (messageIndex >= MESSAGES.length) {
      onComplete();
      return;
    }

    const currentMessage = MESSAGES[messageIndex];
    
    if (text.length < currentMessage.length) {
      const timeoutId = setTimeout(() => {
        setText(currentMessage.slice(0, text.length + 1));
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        if (messageIndex < MESSAGES.length - 1) {
          setMessageIndex(prev => prev + 1);
          setText("");
          onMessageChange(messageIndex + 1);
        }
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [text, messageIndex, onComplete, onMessageChange]);

  return (
    <p className="text-4xl font-bold text-white mb-8 text-center z-10 min-h-[4rem]">
      {text}
      <span className="animate-blink">|</span>
    </p>
  );
};

const AnimatedScene = ({setFinished}) => {
  const [isFireStarted, setIsFireStarted] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [heartColor, setHeartColor] = useState("blue");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const heartRef = useRef(null);
  const jadeRef = useRef(null);
  const fireRef = useRef(null);
  const sceneRef = useRef(null); // Reference to the entire scene for fading out

  const handleMessageChange = (index) => {
    setCurrentMessageIndex(index);
    
    // Show heart after "OH NO MY HEART" message
    if (index === 3) {
      gsap.fromTo(
        heartRef.current,
        { 
          opacity: 0,
          scale: 0,
          y: -20
        },
        { 
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
        }
      );
      setShowHeart(true);
    }
    
    // Start Jade walking after "I NEED TO UNFREEZE IT"
    if (index === 4) {
      setTimeout(() => {
        startJadeAnimation();
        setIsFireStarted(true);
        // Fade in fire effect
        gsap.fromTo(
          fireRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 }
        );
      }, 2000); // Wait for the message to finish typing
    }
  };

  const startJadeAnimation = () => {
    if (jadeRef.current) {
      // First make Jade visible with a fade in
      gsap.fromTo(
        jadeRef.current,
        { 
          opacity: 0,
          left: "-100px"
        },
        { 
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
            // Then start the walking animation
            gsap.to(jadeRef.current, {
              left: "calc(100vw + 100px)",
              duration: 8,
              ease: "none",
              onUpdate: function() {
                const progress = this.progress();
                if (progress >= 0.5 && heartColor === "blue") {
                  setHeartColor("red"); // Change heart color to red
                }
                // Fade everything out after Jade moves off the screen
                if (progress >= 1) {
                  fadeOutScene();
                }
              }
            });
          }
        }
      );
    }
  };

  const fadeOutScene = () => {
    // Fade out the entire scene once Jade has moved off the screen
    gsap.to(sceneRef.current, { opacity: 0, duration: 1 });
    setFinished(true);
  };


  return (
    <div 
      ref={sceneRef}
      className="relative w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      <Snowfall 
        snowflakeCount={200}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh'
        }}
      />

      <TypeWriter 
        onMessageChange={handleMessageChange}
      />

      <img
        src={jade }
        className="fixed bottom-0 w-20 opacity-0 z-10"
        ref={jadeRef}
        alt="Jade"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Heart SVG */}
      <div className="transform transition-all duration-300 ease-in-out">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={heartColor} // Dynamic color
          width="100"
          height="100"
          ref={heartRef}
          className="transition-all duration-300 ease-in-out opacity-0"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Fire Effect */}
      <div 
        ref={fireRef} 
        className="absolute inset-0 pointer-events-none opacity-0"
      >
        <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-orange-500/20 to-transparent" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-1 h-1 bg-orange-500 rounded-full animate-fire"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedScene;
