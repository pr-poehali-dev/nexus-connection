import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      id="cities"
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <img
            src="/images/spiral-circles.jpg"
            alt="Abstract"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sky-950/70" />
        </motion.div>
      </div>

      <h3 className="absolute top-12 right-6 text-white/60 uppercase z-10 text-xs md:text-sm tracking-widest">
        Погода везде
      </h3>

      <p className="absolute bottom-12 right-6 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-4xl z-10 leading-tight font-light">
        Москва, Токио, Нью-Йорк или маленький город у моря — точная погода в любой точке планеты, прямо сейчас.
      </p>
    </div>
  );
}
