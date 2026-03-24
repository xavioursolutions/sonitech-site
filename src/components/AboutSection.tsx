import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "5+", label: "SaaS Platforms" },
  { value: "8+", label: "Mobile Apps" },
  { value: "100%", label: "Client Satisfaction" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-gold/70 font-body">Who We Are</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Pioneering <span className="text-gradient-gold">Digital Innovation</span>
          </h2>
          <div className="gold-divider mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-body font-light">
              Sonitech Australia is a forward-thinking technology company specializing in building 
              scalable SaaS platforms and high-performance mobile applications. We combine cutting-edge 
              technology with thoughtful design to create digital products that stand out.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed font-body font-light">
              Our team brings together expertise in modern web technologies, cloud infrastructure, 
              and user experience design. We don't just build software — we engineer digital 
              experiences that drive growth and transform businesses.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
