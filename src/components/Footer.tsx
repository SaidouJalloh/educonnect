import { GraduationCap, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4 md:px-8">
      <div className="container-custom text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold">
            Edu<span className="text-primary">Connect</span>
          </span>
        </div>
        
        <p className="text-background/70 mb-8 max-w-md mx-auto">
          Accompagner chaque étudiant africain vers son meilleur avenir
        </p>
        
        <div className="h-px bg-background/10 mb-8" />
        
        <p className="text-background/60 text-sm flex items-center justify-center gap-1 flex-wrap">
          © 2025 EduConnect. Tous droits réservés. | Fait avec{" "}
          <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" /> pour l'éducation en Afrique
        </p>
      </div>
    </footer>
  );
};
