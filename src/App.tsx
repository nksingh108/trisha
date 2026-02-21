/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Calendar, 
  Clock, 
  MapPin, 
  Music, 
  Star, 
  Cake, 
  Baby, 
  Users
} from 'lucide-react';
import ConfettiExplosion from 'react-confetti-explosion';

// Image mapping from user uploads
const IMAGES = {
  birth: "/img/trisha_birth_1.jpeg",
  sixMonth: "/img/trisha%206%20month.jpeg",
  tenMonth: "/img/trisha%2010%20month.jpeg",
  oneYear: "/img/trisha_1year.jpeg",
  ganesh: "/img/ganesh.png",
  namstey: "/img/namstey.png"
};

const COUNTDOWN_TARGET = new Date('2026-03-01T00:00:00');

export default function App() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [activePhoto, setActivePhoto] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    // Initial confetti burst
    setIsExploding(true);

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Auto-playing gallery
    const galleryTimer = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % 4);
    }, 4000);

    // Auto-play music with light volume
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        console.log("Autoplay blocked by browser. User interaction required.");
      });
    }

    return () => {
      clearInterval(timer);
      clearInterval(galleryTimer);
    };
  }, []);

  function calculateTimeLeft() {
    const difference = +COUNTDOWN_TARGET - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(() => console.log("Autoplay blocked"));
      setIsPlaying(!isPlaying);
    }
  };

  const timelinePhotos = [
    { src: IMAGES.birth, label: "Day 1 - Welcome to the world, Princess Trisha!", desc: "Welcome to the world, Princess Trisha!" },
    { src: IMAGES.sixMonth, label: "6 Months - Half a year of smiles and giggles.ˇ", desc: "Half a year of smiles and giggles." },
    { src: IMAGES.tenMonth, label: "10 Months - Exploring the world with curious eyes.", desc: "Exploring the world with curious eyes." },
    { src: IMAGES.oneYear, label: "1 Year - Our little star turns ONE!", desc: "Our little star turns ONE!" }
  ];

  return (
    <div className="min-h-screen bg-[#FFF9FB] text-gray-800 font-sans selection:bg-deep-pink selection:text-white overflow-x-hidden">
      {isExploding && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[100]">
          <ConfettiExplosion 
            force={0.8}
            duration={3000}
            particleCount={250}
            width={1600}
            onComplete={() => setIsExploding(false)}
          />
        </div>
      )}
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(252,228,236,0.3)_0%,transparent_70%)]" />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            initial={{ x: Math.random() * 100 + "%", y: "110%" }}
            animate={{ y: "-10%", rotate: 360 }}
            transition={{ duration: 20 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
          >
            <Heart className="text-deep-pink w-6 h-6" />
          </motion.div>
        ))}
      </div>

      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-3 bg-white/60 backdrop-blur-md rounded-full shadow-lg border border-gold/20 text-deep-pink hover:scale-110 transition-transform"
      >
        <Music className={`w-5 h-5 ${isPlaying ? 'animate-spin-slow' : ''}`} />
        <audio ref={audioRef} src="/img/happy-birthday.mp3" />
      </button>

      {/* Main Content Container - Optimized for Minimal Scrolling */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-6 md:py-10 flex flex-col items-center text-center gap-4 md:gap-6">
        
        {/* Ganesha Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-1"
        >
          <img src={IMAGES.ganesh} alt="Ganesha" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <span className="font-serif text-gold font-bold text-base md:text-lg tracking-widest">श्री गणेशाय नमः</span>
          <img src={IMAGES.ganesh} alt="Ganesha" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
        </motion.div>

        {/* Top Invitation Message (Hindi) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-0.5"
        >
          <p className="font-serif text-lg md:text-xl text-gray-800 font-semibold leading-tight">श्री अवधेश प्रताप सिंह जी एवं श्रीमती इन्दु देवी</p>
          <p className="font-serif text-base md:text-lg text-gray-600 leading-tight">आपको एवं आपके परिवार को सादर निमंत्रित करते हैं अपनी प्रिय पौत्री एवं</p>
          <p className="font-serif text-base md:text-lg text-gray-600 leading-tight">श्री धीरज कुमार सिंह व श्रीमती मंडावी सिंह की लाड़ली पुत्री </p>
          <p className="font-serif text-base md:text-lg text-gray-600 leading-tight"><span className="text-deep-pink font-bold">अक्षिता सिंह उर्फ तृशा</span> के</p>
          <p className="font-serif text-lg md:text-xl text-gold font-bold uppercase tracking-wide leading-tight">प्रथम जन्मोत्सव समारोह में</p>
        </motion.div>

        {/* Hero Heading - More Compact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden mb-4 ring-4 ring-gold/20"
          >
            <img src={IMAGES.birth} alt="Trisha" className="w-full h-full object-cover" />
          </motion.div>
          <h1 className="font-serif text-5xl md:text-7xl gold-gradient leading-none drop-shadow-sm">
            Trisha
          </h1>
          <p className="font-cursive text-xl md:text-3xl text-deep-pink -mt-1">is turning One!</p>
        </motion.div>

        {/* Compact Countdown - Smaller */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-2 md:gap-3 justify-center"
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/40 backdrop-blur-md rounded-lg border border-gold/10 flex items-center justify-center shadow-sm">
                <span className="text-base md:text-lg font-serif text-gray-800">{value}</span>
              </div>
              <span className="text-[6px] uppercase tracking-widest text-gray-400 mt-0.5">{unit}</span>
            </div>
          ))}
        </motion.div>

        {/* Image Block & Event Details - Side by Side on Desktop to save space */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Auto-playing Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activePhoto}
                src={timelinePhotos[activePhoto].src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent text-white text-left">
              <motion.p 
                key={`label-${activePhoto}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-cursive text-2xl"
              >
                {timelinePhotos[activePhoto].label}
              </motion.p>
            </div>
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
              <motion.div 
                key={activePhoto}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"
              />
            </div>
          </motion.div>

          {/* Event Details & Family - Compact Bento */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            {/* Event Card */}
            <div id="event-details" className="glass-card p-8 rounded-3xl text-left space-y-6 scroll-mt-20">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-gold" />
                  </div>
                  <span className="font-serif text-xl">Sunday, March 1st, 2026</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <span className="font-serif text-xl">6:00 PM Onwards (Cake Cutting & Dinner)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <a 
                    href="https://share.google/5F8A0kz4Poqzm9bNW" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-serif text-xl text-gold hover:underline"
                  >
                    Vill Post pakariyar Bishunpur
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* New Hindi Invitation Section - Replaces RSVP */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-4xl"
        >
          <div className="glass-card p-6 md:p-10 rounded-[2rem] text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <img src={IMAGES.namstey} alt="Namstey" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
              <h2 className="font-serif text-2xl md:text-3xl text-gold font-bold tracking-widest">दर्शनाभिलाषी</h2>
              <img src={IMAGES.namstey} alt="Namstey" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
            </div>

            <div className="space-y-3 text-gray-700">
              <p className="font-serif text-lg md:text-xl font-semibold">श्रीमती इन्दु देवी एवं श्री अवधेश प्रताप सिंह</p>
              <p className="font-serif text-lg md:text-xl font-semibold">श्रीमती नम्रता सिंह एवं श्री नीरज कुमार सिंह</p>
              <p className="font-serif text-lg md:text-xl font-semibold">श्रीमती मंदवी सिंह एवं श्री धीरज कुमार सिंह</p>
              <p className="font-serif text-lg md:text-xl font-semibold">बड़े भैया अयांश प्रताप सिंह एवं छोटी बहन आश्वी सिंह</p>
            </div>

            <div className="pt-4 border-t border-gold/10">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Contact Numbers</p>
              <p className="font-serif text-base md:text-lg text-gold tracking-wider">
                9637568693, 9015464439, 8826577171
              </p>
            </div>

            <p className="font-serif text-base md:text-lg text-deep-pink italic pt-4">
              "आप सभी का स्नेहपूर्ण आगमन तृशा के प्रथम जन्मोत्सव को और भी विशेष बना देगा।"
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer - Elegant & Minimal */}
      <footer className="py-12 text-center relative z-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-4"
        >
          <Heart className="w-6 h-6 text-gold mx-auto fill-gold/10" />
        </motion.div>
        <p className="font-cursive text-2xl text-gray-600 mb-1">With lots of love,</p>
        <p className="font-serif text-lg gold-gradient">The Singh Family</p>
        <p className="text-[8px] text-gray-300 uppercase tracking-[0.4em] mt-8">
          Celebrating Trisha's First Year • 2026
        </p>
      </footer>
    </div>
  );
}
