// import { profile } from "@/data/profile";
// import { Quote } from "lucide-react";

// export function About() {
//   return (
//     <section id="about" className="bg-cream py-28">
//       <div className="mx-auto max-w-[1400px] px-6 md:px-10">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
//           <div className="md:col-span-5">
//             <div className="label-eyebrow">01 — About</div>
//             <h2 className="display-serif text-navy mt-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
//               Still becoming.<br />Always<br /><span className="italic-accent">moving forward.</span>
//             </h2>
//           </div>
//           <div className="md:col-span-7">
//             <div className="flex gap-4">
//               <Quote className="text-gold shrink-0 mt-2" size={32} />
//               <p className="font-serif italic text-navy text-2xl md:text-3xl leading-snug">
//                 {profile.about.quote}
//               </p>
//             </div>
//             <div className="hairline my-10" />
//             <div className="space-y-5 text-navy/85 leading-relaxed">
//               {profile.about.paragraphs.map((p, i) => (
//                 <p key={i}>{p}</p>
//               ))}
//             </div>
//             <div className="hairline mt-12 mb-8" />
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {profile.about.stats.map((s) => (
//                 <div key={s.label}>
//                   <div className="font-serif text-3xl text-navy">{s.value}</div>
//                   <div className="label-eyebrow mt-1">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }





































import { profile } from "@/data/profile";
import { Quote } from "lucide-react";
import CountUp from "@/components/CountUp";

// Helper to split "8+" into numeric part and suffix
function parseStat(value: string): { num: number; suffix: string } {
  const match = value.match(/^([\d.]+)(.*)$/);
  return match
    ? { num: parseFloat(match[1]), suffix: match[2] }
    : { num: 0, suffix: value };
}

export function About() {
  return (
    <section id="about" className="bg-cream py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="label-eyebrow">01 — About</div>
            <h2 className="display-serif text-navy mt-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Still becoming.<br />Always<br /><span className="italic-accent">moving forward.</span>
            </h2>
          </div>
          <div className="md:col-span-7">
            <div className="flex gap-4">
              <Quote className="text-gold shrink-0 mt-2" size={32} />
              <p className="font-serif italic text-navy text-2xl md:text-3xl leading-snug">
                {profile.about.quote}
              </p>
            </div>
            <div className="hairline my-10" />
            <div className="space-y-5 text-navy/85 leading-relaxed">
              {profile.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="hairline mt-12 mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {profile.about.stats.map((s) => {
                const { num, suffix } = parseStat(s.value);
                return (
                  <div key={s.label}>
                    <div className="font-serif text-3xl text-navy">
                      <CountUp
                        from={5}
                        to={num}
                        duration={1}
                        separator=","
                        className="font-serif text-3xl text-navy"
                      />
                      {suffix}  {/* renders "+", "K", "yrs" etc after the number */}
                    </div>
                    <div className="label-eyebrow mt-1">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}