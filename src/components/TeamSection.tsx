import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  { name: "Shan Ali Gohar", role: "Founder", image: "/Images/idpic-us-passport (2).jpg" },
  { name: "Ahsan Abbas", role: "Co-Founder", image: "/Images/idpic-us-passport (1).jpg" },
  { name: "Shaban Iftikhar", role: "Meta Ads Specialist", image: "/Images/idpic-us-passport (6).jpg" },
  { name: "Sharaq Abbas", role: "SEO Executive", image: "/Images/idpic-us-passport (4).jpg" },
  { name: "Fazeel Mehdi", role: "Junior Web Developer", image: "/Images/idpic-us-passport (5).jpg" },
  { name: "Faizan Ur Rehman", role: "UI/UX Designer", image: "/Images/idpic-us-passport (3).jpg" },
  { name: "Arooj Fatima", role: "UI/UX Designer", image: "/Images/idpic-us-passport.jpg" },
];

const TeamSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-gold/70 font-body">The Team</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Meet Our <span className="text-gradient-gold">Leaders</span>
          </h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.slice(0, 6).map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="glass-card-hover p-8 text-center group"
            >
              <div className="w-36 h-36 rounded-full mx-auto mb-6 bg-gradient-to-br from-gold/20 to-gold-dark/10 border-2 border-gold/20 flex items-center justify-center overflow-hidden group-hover:border-gold/50 transition-all duration-500 group-hover:shadow-[0_0_40px_hsl(43_74%_49%/0.2)]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className={`w-full h-full object-cover object-center transition-transform duration-500 ${member.name === "Nimra Jafar" ? "scale-125" : "scale-125"}`}
                />
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-gold/70 text-sm font-body tracking-wide">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

        {team.length > 6 && (
          <div className="flex justify-center mt-8">
            <motion.div
              key={team[6].name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + 6 * 0.15 }}
              className="glass-card-hover p-8 text-center group w-full md:w-1/2 lg:w-1/3"
            >
              <div className="w-36 h-36 rounded-full mx-auto mb-6 bg-gradient-to-br from-gold/20 to-gold-dark/10 border-2 border-gold/20 flex items-center justify-center overflow-hidden group-hover:border-gold/50 transition-all duration-500 group-hover:shadow-[0_0_40px_hsl(43_74%_49%/0.2)]">
                <img 
                  src={team[6].image} 
                  alt={team[6].name} 
                  className="w-full h-full object-cover object-center scale-125 transition-transform duration-500" 
                />
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                {team[6].name}
              </h3>
              <p className="text-gold/70 text-sm font-body tracking-wide">
                {team[6].role}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
