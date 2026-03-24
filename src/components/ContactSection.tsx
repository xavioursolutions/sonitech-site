import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gold/5 blur-[200px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-[0.3em] uppercase text-gold/70 font-body">Get in Touch</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-8">
            Let's Build <span className="text-gradient-gold">Something Great</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-body font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Ready to bring your vision to life? Whether you need a SaaS platform, 
            mobile app, or digital transformation — we're here to make it happen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="mailto:info@sonitech.com.au" className="btn-gold text-base group">
            Start a Conversation
            <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
          </a>
          <a href="mailto:info@sonitech.com.au" className="btn-outline-gold text-base">
            info@sonitech.com.au
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
