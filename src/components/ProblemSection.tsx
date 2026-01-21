import { motion } from "framer-motion";
import { Compass, BookOpen, Clock, Target, type LucideIcon } from "lucide-react";

interface ProblemItem {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const problems: ProblemItem[] = [
  {
    Icon: Compass,
    title: "Manque d'orientation",
    description: "Absence de conseillers d'orientation qualifiés et d'informations structurées pour faire les bons choix académiques.",
  },
  {
    Icon: BookOpen,
    title: "Information dispersée",
    description: "Les ressources éducatives, bourses et opportunités sont éparpillées et difficiles à trouver au bon moment.",
  },
  {
    Icon: Clock,
    title: "Opportunités manquées",
    description: "De nombreux étudiants ratent des bourses et formations faute d'information en temps réel et d'alertes personnalisées.",
  },
  {
    Icon: Target,
    title: "Décisions non éclairées",
    description: "Sans accompagnement adapté, les choix d'orientation se font souvent au hasard, limitant le potentiel des étudiants.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const ProblemSection = () => {
  return (
    <section id="probleme" className="section-padding bg-gradient-to-b from-secondary/50 to-background relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
            Le Défi
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Le problème que nous résolvons
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-12">
            Dans de nombreuses régions d'Afrique, les étudiants font face à des obstacles majeurs 
            dans leur parcours éducatif.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={itemVariants}
              className="group relative bg-card rounded-2xl p-6 border-2 border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-medium overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all">
                <problem.Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
