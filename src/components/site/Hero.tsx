

// import { profile } from "@/data/profile";
// import { useEffect, useState } from "react";
// import Lottie from "lottie-react";

// export function Hero() {
//   const [scrollY, setScrollY] = useState(0);
//   const [animationData, setAnimationData] = useState<any>(null);

//   useEffect(() => {
//     fetch("/B1.json").then((res) => res.json()).then(setAnimationData);
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="relative w-full h-[100svh] min-h-[600px] bg-navy overflow-hidden font-sans">

//       {/* ── MOBILE LAYOUT (hidden on md+) ── */}
//       <div className="flex md:hidden w-full h-full relative">

//         {/* Big name top-left */}
//         <h1
//           className="absolute top-28 left-4 font-serif text-cream font-bold leading-none tracking-tighter z-10 pointer-events-none select-none"
//           style={{
//             fontSize: "clamp(7rem, 44vw, 8rem)",
//             transform: `translateY(${scrollY * 0.7}px)`
//           }}
//         >
//           Prachi
//         </h1>

//         {/* Category labels stacked on left */}
//         <div
//           className="absolute left-5 z-10 flex flex-col gap-5 text-[11px] font-semibold tracking-widest"
//           style={{
//             top: "calc(16px + clamp(5rem, 22vw, 8rem) + 10rem)",
//             transform: `translateY(${scrollY * 0.5}px)`
//           }}
//         >
//           <div className="flex flex-col">
//             <span className="text-cream/60">Creative</span>
//             <span className="text-cream uppercase">Writer</span>
//           </div>
//           <div className="flex flex-col">
//             <span className="text-cream/60">Management</span>
//             <span className="text-cream uppercase">Consultant</span>
//           </div>
//           <div className="flex flex-col">
//             <span className="text-cream/60">Since</span>
//             <span className="text-cream uppercase">2016</span>
//           </div>
//         </div>

//         {/* Image right side, full height */}
//         <div
//           className="absolute right-[-80%] bottom-0 w-[230%] h-full z-20 flex items-end justify-end pointer-events-none"
//           style={{ transform: `translateY(${scrollY * 0.15}px)` }}
//         >
//           <img
//             src="/LandingPageMasked.png"
//             alt="Prachi Shankar"
//             className="w-full h-full object-contain object-bottom drop-shadow-2xl"
//             style={{ filter: "drop-shadow(0px -8px 20px rgba(0, 0, 0, 0.1))" }}
//           />
//         </div>

//         {/* QR — mobile */}
//         <div className="absolute bottom-6 right-4 z-30 border-[3px] border-cream bg-cream p-1">
//           <div className="w-14 h-14 ">
//             {animationData ? (
//               <Lottie animationData={animationData} loop={true} className="w-full h-full" style={{ mixBlendMode: "multiply" }} />
//             ) : (
//               <div className="w-full h-full text-navy bg-cream" />
//             )}
//           </div>
//         </div>

//       </div>

//       {/* ── DESKTOP / TABLET LAYOUT (hidden on mobile) ── */}
//       <div className="hidden md:block w-full h-full">

//         {/* Background large text container */}
//         <div
//           className="absolute inset-0 flex flex-col items-center justify-center z-0 w-full"
//           style={{ transform: `translateY(calc(-15vh + ${scrollY * 0.9}px))` }}
//         >
//           {/* Top Floating Categories */}
//           <div className="w-full max-w-[90vw] md:max-w-[85vw] flex justify-between items-end px-2 sm:px-6 md:px-12 text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest text-cream mb-[-5vw] sm:mb-[-4vw] z-10 relative">
//             <div className="flex flex-col text-left">
//               <span className="text-cream/70 mb-1">Creative</span>
//               <span className="text-cream uppercase">Writer</span>
//             </div>
//             <div className="flex flex-col text-left">
//               <span className="text-cream/70 mb-1">Management</span>
//               <span className="text-cream uppercase">Consultant</span>
//             </div>
//             <div className="flex flex-col text-right">
//               <span className="text-cream/70 mb-1">Since</span>
//               <span className="text-cream uppercase">2016</span>
//             </div>
//           </div>

//           {/* Giant Name */}
//           <div className="w-full text-center relative max-w-full overflow-hidden pointer-events-none select-none">
//             <h1
//               className="font-serif text-cream font-bold leading-[0.9] tracking-tighter"
//               style={{ fontSize: "clamp(6rem, 24vw, 36rem)" }}
//             >
//               Prachi
//             </h1>
//           </div>
//         </div>

//         {/* ── GLASS BAR — sits below name (z-10), image floats over it (z-20) ── */}
//         {/* ↓ Adjust top to align with bottom of name, height to control band thickness */}
//         <div
//           className="absolute z-10 pointer-events-none"
//           style={{
//             top: "49%",
//             left: 0,
//             transform: `translateY(${scrollY * 0.9}px)`,  // ← no more translateX
//             height: "55%",
//             width: "100vw",                                 // ← full viewport
//             background: "rgba(255, 255, 255, 0.07)",
//             backdropFilter: "blur(16px)",
//             WebkitBackdropFilter: "blur(16px)",
//             borderTop: "1px solid rgba(255, 255, 255, 0.15)",
//             borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//             clipPath: "polygon(23% 0%, 78% 0%, 100% 100%, 0% 100%)",  // ← full bottom
//           }}
//         />

//         {/* Foreground Model Image */}
//         <div
//           className="absolute bottom-0 left-1/2 w-[75%] md:w-[100%] lg:w-[75%] max-w-[1200px] z-20 flex justify-center pointer-events-none origin-bottom"
//           style={{ transform: `translate(-50%, ${scrollY * 0.15}px)` }}
//         >
//           <img
//             src="/LandingPageMasked.png"
//             alt="Prachi Shankar"
//             className="w-full h-auto max-h-[85vh] object-contain object-bottom drop-shadow-2xl"
//             style={{ filter: "drop-shadow(0px -8px 20px rgba(0, 0, 0, 0.15))" }}
//           />
//         </div>

//         {/* QR — desktop */}
//         <div className="absolute bottom-12 right-6 md:bottom-20 md:right-16 z-40 hidden lg:block p-1">
//           <div className="w-16 h-16 md:w-20 md:h-20">
//             {animationData ? (
//               <Lottie animationData={animationData} loop={true} className="w-full h-full" style={{ mixBlendMode: "multiply" }} />
//             ) : (
//               <div className="w-full h-full text-navy bg-cream" />
//             )}
//           </div>
//         </div>

//       </div>

//     </section>
//   );
// }





















































import { profile } from "@/data/profile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [animationData, setAnimationData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/B1.json").then((res) => res.json()).then(setAnimationData);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] bg-navy overflow-hidden font-sans">

      {/* ── MOBILE LAYOUT (hidden on md+) ── */}
      <div className="flex md:hidden w-full h-full relative">

        {/* Big name top-left */}
        <h1
          className="absolute top-28 left-4 font-serif text-cream font-bold leading-none tracking-tighter z-10 pointer-events-none select-none"
          style={{
            fontSize: "clamp(7rem, 44vw, 8rem)",
            transform: `translateY(${scrollY * 0.7}px)`
          }}
        >
          Prachi
        </h1>

        {/* Category labels stacked on left */}
        <div
          className="absolute left-5 z-10 flex flex-col gap-5 text-[11px] font-semibold tracking-widest"
          style={{
            top: "calc(16px + clamp(5rem, 22vw, 8rem) + 10rem)",
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="flex flex-col">
            <span className="text-cream/60">Creative</span>
            <span className="text-cream uppercase">Writer</span>
          </div>
          <div className="flex flex-col">
            <span className="text-cream/60">Management</span>
            <span className="text-cream uppercase">Consultant</span>
          </div>
          <div className="flex flex-col">
            <span className="text-cream/60">Since</span>
            <span className="text-cream uppercase">2016</span>
          </div>
        </div>

        {/* Image right side, full height */}
        <div
          className="absolute right-[-80%] bottom-0 w-[230%] h-full z-20 flex items-end justify-end pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <img
            src="/LandingPageMasked1.png"
            alt="Prachi Shankar"
            className="w-full h-full object-contain object-bottom drop-shadow-2xl"
            style={{ filter: "drop-shadow(0px -8px 20px rgba(0, 0, 0, 0.1))" }}
          />
        </div>

        
        {/* QR — mobile */}
        <div
          className="absolute bottom-6 right-4 z-30 p-1 cursor-pointer group"
          onClick={() => navigate("/blog")}
        >
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-cream text-[10px] tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">

          </span>
          <div className="relative w-14 h-14 transition-transform duration-200 group-hover:scale-110">
            {/* Glow */}
            <div
              className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"
              style={{ boxShadow: "0 0 20px 4px rgba(255, 255, 255, 0.7)" }}
            />
            {animationData ? (
              <Lottie animationData={animationData} loop={true} className="w-full h-full relative z-10" style={{ mixBlendMode: "multiply" }} />
            ) : (
              <div className="w-full h-full text-navy bg-cream" />
            )}
          </div>
        </div>

      </div>

      {/* ── DESKTOP / TABLET LAYOUT (hidden on mobile) ── */}
      <div className="hidden md:block w-full h-full">

        {/* Background large text container */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-0 w-full"
          style={{ transform: `translateY(calc(-15vh + ${scrollY * 0.9}px))` }}
        >
          {/* Top Floating Categories */}
          <div className="w-full max-w-[90vw] md:max-w-[85vw] flex justify-between items-end px-2 sm:px-6 md:px-12 text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest text-cream mb-[-5vw] sm:mb-[-4vw] z-10 relative">
            <div className="flex flex-col text-left">
              <span className="text-cream/70 mb-1">Creative</span>
              <span className="text-cream uppercase">Writer</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-cream/70 mb-1">Management</span>
              <span className="text-cream uppercase">Consultant</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-cream/70 mb-1">Since</span>
              <span className="text-cream uppercase">2016</span>
            </div>
          </div>

          {/* Giant Name */}
          <div className="w-full text-center relative max-w-full overflow-hidden pointer-events-none select-none">
            <h1
              className="font-serif text-cream font-bold leading-[0.9] tracking-tighter"
              style={{ fontSize: "clamp(6rem, 24vw, 36rem)" }}
            >
              Prachi
            </h1>
          </div>
        </div>

        {/* ── GLASS BAR ── */}
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            top: "49%",
            left: 0,
            transform: `translateY(${scrollY * 0.9}px)`,
            height: "55%",
            width: "100vw",
            background: "rgba(255, 255, 255, 0.07)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            clipPath: "polygon(23% 0%, 78% 0%, 100% 100%, 0% 100%)",
          }}
        />

        {/* Foreground Model Image */}
        <div
          className="absolute bottom-0 left-1/2 w-[75%] md:w-[100%] lg:w-[75%] max-w-[1200px] z-20 flex justify-center pointer-events-none origin-bottom"
          style={{ transform: `translate(-50%, ${scrollY * 0.15}px)` }}
        >
          <img
            src="/LandingPageMasked1.png"
            alt="Prachi Shankar"
            className="w-full h-auto max-h-[85vh] object-contain object-bottom drop-shadow-2xl"
            style={{ filter: "drop-shadow(0px -8px 20px rgba(0, 0, 0, 0.15))" }}
          />
        </div>

        {/* QR — desktop */}
        <div
          className="absolute bottom-12 right-6 md:bottom-20 md:right-16 z-40 hidden lg:block p-1 cursor-pointer group"
          onClick={() => navigate("/blog")}
        >
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-cream text-[10px] tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">

          </span>
          <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform duration-200 group-hover:scale-110">
            {/* Glow */}
            <div
              className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"
              style={{ boxShadow: "0 0 20px 4px rgba(255, 255, 255, 0.7)" }}
            />
            {animationData ? (
              <Lottie animationData={animationData} loop={true} className="w-full h-full relative z-10" style={{ mixBlendMode: "multiply" }} />
            ) : (
              <div className="w-full h-full text-navy bg-cream" />
            )}
          </div>
        </div>

      </div>

    </section>
  );
}