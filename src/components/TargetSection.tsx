import { motion } from "framer-motion";
import { GraduationCap, Users, School, Handshake, type LucideIcon } from "lucide-react";

interface TargetItem {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const targets: TargetItem[] = [
  {
    Icon: GraduationCap,
    title: "Élèves & Étudiants",
    description: "Tu cherches ton orientation, une bourse ou une formation ? EduConnect t'aide à prendre les bonnes décisions pour ton avenir.",
  },
  {
    Icon: Users,
    title: "Parents",
    description: "Vous voulez le meilleur pour vos enfants mais l'information manque ? Nous vous aidons à les guider vers la réussite.",
  },
  {
    Icon: School,
    title: "Établissements",
    description: "Vous souhaitez mieux informer vos élèves et réduire les inégalités ? Intégrez EduConnect dans votre accompagnement.",
  },
  {
    Icon: Handshake,
    title: "ONGs & Partenaires",
    description: "Vous œuvrez pour l'éducation en Afrique ? Collaborons pour maximiser l'impact de vos programmes.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const TargetSection = () => {
  return (
    <section id="cible" className="section-padding gradient-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
            Pour qui ?
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            EduConnect est fait pour toi
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Notre plateforme s'adresse à tous ceux qui veulent transformer l'avenir 
            éducatif de la jeunesse africaine
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {targets.map((target) => (
            <motion.div
              key={target.title}
              variants={itemVariants}
              className="group bg-card rounded-3xl p-8 text-center border-2 border-transparent hover:border-primary transition-all duration-300 hover:-translate-y-2 shadow-soft hover:shadow-medium"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:scale-110 transition-all">
                <target.Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{target.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {target.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
