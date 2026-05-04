
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Lottie from "lottie-react";

const signatureAnimation = {"v":"5.12.2","fr":29.9700012207031,"ip":0,"op":118.000004806239,"w":1920,"h":1080,"nm":"Prachi_SignatureF2","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"p","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[1205.926,681.562,0],"ix":2,"l":2},"a":{"a":0,"k":[938.455,411.663,0],"ix":1,"l":2},"s":{"a":0,"k":[87.215,113.485,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-3.231,22.618],[0,0],[1.302,-26.044],[6,-64],[2,-17],[0,0],[0,0],[0,0],[0,-41.195],[0,0],[-18,39],[0,0]],"o":[[9,-63],[0,0],[-3,60],[-6,64],[-2,17],[0,0],[0,0],[0,0],[0,48],[0,0],[18,-39],[0,0]],"v":[[215.529,134.101],[233.529,105.101],[238.529,145.101],[231.529,240.101],[222.529,333.101],[213.529,420.101],[208.529,483.101],[205.529,544.1],[203.529,604.101],[207.529,671.101],[240.529,678.101],[248.529,634.101]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":50,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[233.5,-30],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":4,"s":[0]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":35,"s":[89]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0]},"t":48,"s":[99]},{"i":{"x":[0.569],"y":[0.918]},"o":{"x":[0.199],"y":[0]},"t":62,"s":[100]},{"i":{"x":[0.744],"y":[1]},"o":{"x":[0.321],"y":[0.138]},"t":102,"s":[10]},{"t":112.000004561854,"s":[0]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":900.000036657751,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"s","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[1511.926,546.062,0],"ix":2,"l":2},"a":{"a":0,"k":[938.455,411.663,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[90,38],[-12,10],[-82,24],[-36,0],[-26,-32],[-3.305,-28.09],[14,-14],[0,0],[48,-22],[73.92,-22.176],[24.839,-11.286],[-27.5,-20],[-32,6],[0,0],[0,0],[-5.515,-5.252],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[-90,-38],[12,-10],[82,-24],[36,0],[26,32],[4,34],[-14,14],[0,0],[-48,22],[-80,24],[-77.796,35.347],[26.081,18.968],[32,-6],[0,0],[0,0],[10.5,10],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[190.529,209.601],[94.529,73.601],[212.529,-2.399],[334.529,-26.399],[482.529,17.601],[518.529,87.601],[484.529,175.601],[402.529,221.601],[323.529,259.601],[190.029,304.601],[90.19,339.887],[22.529,447.601],[150.529,462.601],[233.029,451.101],[329.029,442.101],[370.529,449.601],[384.529,479.601],[382.029,501.101],[363.029,535.101],[320.529,582.601],[280.529,621.601],[123.529,742.601],[48.529,796.101],[37.398,803.859],[32.029,807.601]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":25,"s":[0]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":40.918,"s":[31.425]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":47.739,"s":[57]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":57,"s":[97.049]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":75,"s":[100]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":88.663,"s":[57]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":95,"s":[29]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":104.351,"s":[15.713]},{"t":109.000004439661,"s":[0]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":50,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[-4,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 2","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":900.000036657751,"st":0,"ct":1,"bm":0}],"markers":[],"props":{}};

const links = [
  { label: "About", href: "/#about" },
  { label: "Journey", href: "/#journey" },
  { label: "Books", href: "/#books" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function Nav({ variant = "auto" }: { variant?: "auto" | "navy" | "cream" }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHome = location.pathname === "/";
  const isNavy = variant === "navy" || (variant === "auto" && onHome && !scrolled && !mobileMenuOpen);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[200] transition-colors duration-300 ${
          isNavy ? "bg-navy text-cream" : "bg-cream/90 text-navy backdrop-blur-md border-b border-border/40"
        }`}
      >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">

          {/* P box replaced with Lottie signature animation */}
          <div className={`h-12 w-12 border ${isNavy ? "border-cream/40" : "border-navy/40"} overflow-hidden flex items-center justify-center`}>
            <Lottie
              animationData={signatureAnimation}
              loop={true}
              style={{
                width: "100%",   // ← zoom in since canvas is 1920x1080
                height: "100%",
                marginLeft: "0%", // ← pan left/right to center the signature
                marginTop: "0%", // ← pan up/down to center it
                filter: isNavy ? "invert(1)" : "none", // ← white on navy, black on cream
              }}
            />
          </div>

          <img
            src="/images/sign.svg"
            alt="Prachi Shankar"
            className={`h-12 object-contain ${isNavy ? "invert" : ""}`}
            style={{ filter: isNavy ? "brightness(0) invert(1)" : "none" }}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-serif text-lg hover:opacity-70 transition">
              {l.label}
            </a>
          ))}
          {/* <a href="/#contact" className={isNavy ? "gold-pill" : "navy-pill"}>
            Say Hello
          </a> */}
        </nav>
        
        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className={`md:hidden flex items-center justify-center p-2 -mr-2 ${isNavy ? "text-cream" : "text-navy"}`}
        >
          <Menu size={28} />
        </button>
        </div>
        

      </header>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 z-[210] bg-navy/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-[220] w-[85vw] max-w-[320px] bg-navy top-0 bottom-0 text-cream flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl border-l border-cream/10 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-20 px-6 flex items-center justify-end border-b border-cream/10">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 -mr-2 text-cream hover:text-gold transition"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col px-8 py-10 gap-6">
          <div className="label-eyebrow text-cream/50 mb-2">Menu</div>
          {links.map((l) => (
            <a 
              key={l.href} 
              href={l.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="display-serif text-3xl hover:text-gold transition"
            >
              {l.label}
            </a>
          ))}
          <div className="hairline mt-4 border-cream/10"></div>
          <a 
            href="/#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 inline-block navy-pill border border-cream/20 text-center w-full"
          >
            Say Hello ↗
          </a>
        </nav>
      </div>
      
    </>
  ); 
}
