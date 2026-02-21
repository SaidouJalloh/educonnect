import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-students.jpg";

const stats = [
  { value: "24/7", label: "Accompagnement disponible" },
  { value: "100%", label: "Opportunités personnalisées" },
  { value: "∞", label: "Possibilités d'avenir" },
];

export const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-float-slow -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-float-reverse translate-y-1/4 -translate-x-1/4" />
      
      <div className="container-custom px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Votre{" "}
              <span className="relative inline-block">
                <span className="text-primary">avenir</span>
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-primary/20 -skew-y-2 -z-10" />
              </span>
              <br />
              commence ici
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl"
            >
              La plateforme intelligente qui guide les étudiants africains vers les meilleures 
              opportunités éducatives. Orientation personnalisée, bourses et formations à portée de main.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("#waitlist")}
                className="rounded-full px-8 py-6 text-base font-semibold shadow-strong hover:shadow-medium hover:-translate-y-1 transition-all group"
              >
                Tester EduConnect gratuitement
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("#solution")}
                className="rounded-full px-8 py-6 text-base font-semibold border-2 hover:bg-foreground hover:text-background transition-all"
              >
                En savoir plus
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Floating emoji */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-8 -right-4 text-6xl opacity-30"
            >
              🎓
            </motion.div>

            <div className="bg-card rounded-3xl overflow-hidden shadow-strong border-2 border-border relative">
              {/* Hero Image */}
              <div className="relative h-44 sm:h-52 md:h-60 overflow-hidden">
                <img 
                  src={heroImage} 
                  alt="Étudiants africains collaborant" 
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 30%" }}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                    e.currentTarget.className = "w-full h-full object-contain p-8 opacity-50";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              
              <div className="p-6 space-y-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 bg-secondary rounded-xl border-l-4 border-primary"
                  >
                    <div>
                      <span className="font-display text-2xl font-bold text-primary block">
                        {stat.value}
                      </span>
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
