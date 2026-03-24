import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Smartphone, Globe, Layers } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "SaaS Development",
    description: "End-to-end SaaS platform development with scalable architecture, multi-tenancy, and modern cloud infrastructure.",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "High-performance cross-platform mobile apps with fluid animations, offline support, and seamless user experience.",
  },
  {
    icon: Globe,
    title: "Web Technologies",
    description: "Modern web applications built with the latest frameworks, optimized for speed, accessibility, and conversion.",
  },
  {
    icon: Layers,
    title: "Scalable Solutions",
    description: "Cloud-native architectures designed to grow with your business, from startup to enterprise scale.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding relative" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-gold/70 font-body">What We Do</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Our <span className="text-gradient-gold">Expertise</span>
          </h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="glass-card-hover p-8 md:p-10 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-500">
                <service.icon className="text-gold" size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4 text-foreground group-hover:text-gold-light transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-body font-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
