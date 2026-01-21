import { motion } from "framer-motion";
import { Bot, Bell, Check, MessageSquare, Zap } from "lucide-react";

const features = [
  {
    number: "1",
    Icon: MessageSquare,
    title: "EduBot – Assistant IA",
    description: "Un chatbot intelligent qui analyse votre profil et vos ambitions pour vous offrir des recommandations personnalisées.",
    highlights: [
      "Conseils sur les filières et parcours",
      "Informations sur admissions et débouchés",
      "Stratégies d'apprentissage adaptées",
      "Réponses instantanées 24/7",
    ],
  },
  {
    number: "2",
    Icon: Zap,
    title: "Alertes intelligentes",
    description: "Recevez en temps réel les opportunités qui correspondent exactement à votre profil et vos objectifs.",
    highlights: [
      "Bourses locales et internationales",
      "Formations gratuites et certifiantes",
      "Concours d'entrée aux écoles",
      "Programmes d'échange et bootcamps",
    ],
  },
];

export const SolutionSection = () => {
  return (
    <section id="solution" className="section-padding gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
            Notre Solution
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Comment EduConnect vous accompagne
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Une plateforme tout-en-un propulsée par l'intelligence artificielle pour 
            démocratiser l'accès à l'information éducative.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                <feature.Icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-white/80 leading-relaxed mb-6">
                {feature.description}
              </p>
              
              <ul className="space-y-3">
                {feature.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-white/90">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
