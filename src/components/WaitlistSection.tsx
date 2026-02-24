import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Rocket, Gift, Lightbulb, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";

const benefits = [
  { icon: Rocket, text: "Accès anticipé à EduConnect" },
  { icon: Gift, text: "Gratuité totale pendant le test" },
  { icon: Lightbulb, text: "Influence sur le développement" },
];

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzb7jBkGwOa6Pkctzd1oy8Sjq7rZ19UNCOt8EMzI1aWdv0FSV2Yal_Euu-rIRhrbhkcYA/exec";

export const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [position, setPosition] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    const savedData = localStorage.getItem("educonnect_waitlist");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setPosition(parsedData.position);
      setIsSuccess(true);
      setEmail(parsedData.email);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const normalizedEmail = email.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    if (!consent) {
      toast.error("Veuillez accepter la politique de confidentialité");
      return;
    }

    const savedData = localStorage.getItem("educonnect_waitlist");
    if (savedData) {
      const { email: savedEmail } = JSON.parse(savedData);
      if (savedEmail.toLowerCase() === normalizedEmail) {
        setError("Vous êtes déjà inscrit avec cet email !");
        return;
      }
    }

    setIsLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          timestamp: new Date().toISOString(),
          source: "react_waitlist"
        }),
      });

      const lastNumber = parseInt(localStorage.getItem("educonnect_last_position") || "149");
      const newPosition = lastNumber + 1;

      localStorage.setItem("educonnect_waitlist", JSON.stringify({ 
        email: normalizedEmail, 
        position: newPosition 
      }));
      localStorage.setItem("educonnect_last_position", newPosition.toString());

      setPosition(newPosition);
      setIsSuccess(true);
      toast.success("Bienvenue dans la famille !");
    } catch (err) {
      toast.error("Une erreur réseau est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="waitlist" className="py-16 sm:py-24 bg-primary relative overflow-hidden">
      {/* Blob décoratif — réduit sur mobile, pointer-events-none pour iOS */}
      <div className="absolute top-0 left-0 w-72 sm:w-[600px] h-72 sm:h-[600px] bg-white/5 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4 animate-pulse pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* GAUCHE — Infos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <span className="inline-block bg-white text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Accès Anticipé
            </span>

            {/* FIX: text-3xl sur mobile pour éviter le débordement */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Rejoins la liste d'attente
            </h2>
            
            {/* FIX: max-w-full pour que la carte avatars ne sorte pas de l'écran */}
            <div className="rounded-2xl p-3 sm:p-4 mb-8 sm:mb-10 flex items-center gap-3 sm:gap-4 bg-white shadow-xl border-2 border-primary/20 w-fit max-w-full">
              <div className="flex -space-x-2 flex-shrink-0">
                {[avatar1, avatar2, avatar3, avatar4].map((src, i) => (
                  <div key={i} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-primary overflow-hidden">
                    <img src={src} alt="Étudiant" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-slate-900 font-semibold text-sm sm:text-base">
                <strong className="text-lg sm:text-xl text-primary">+100</strong> inscrits 🔥
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4 bg-white/10 p-3 sm:p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* DROITE — Formulaire */}
          <div className="relative w-full">
            {!isSuccess ? (
              <form
                onSubmit={handleSubmit}
                // FIX: p-6 sm:p-8 md:p-10 pour éviter le débordement sur petits écrans
                className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-white/50 w-full"
              >
                <p className="text-slate-400 font-medium mb-6 sm:mb-8 text-sm sm:text-base">
                  Réserve ta place en 10 secondes
                </p>

                <div className="space-y-5">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      // FIX: text-base (16px) évite le zoom automatique sur iOS Safari
                      className={cn(
                        "h-12 sm:h-14 rounded-2xl border-2 px-4 sm:px-6 text-base transition-all text-slate-900",
                        error ? "border-red-500 bg-red-50" : "border-slate-100 focus:border-primary"
                      )}
                    />
                    
                    <AnimatePresence>
                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 mt-2 text-red-500 font-medium text-sm"
                        >
                          <span className="text-base">⚠️</span>
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={(c) => setConsent(c as boolean)}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <label htmlFor="consent" className="text-sm text-slate-500 leading-snug cursor-pointer">
                      J'accepte de recevoir des informations sur EduConnect.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 sm:h-14 rounded-2xl text-base sm:text-lg font-bold group bg-primary text-white"
                  >
                    {isLoading ? "Vérification..." : "Rejoindre la liste d'attente"}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                // FIX: p-8 sm:p-12 au lieu de p-12 fixe
                className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl w-full"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                  <CheckCircle className="w-9 h-9 sm:w-12 sm:h-12 text-green-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
                  Position réservée !
                </h3>
                <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-primary/10 mb-6 text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Ta place</p>
                  <span className="text-5xl sm:text-6xl font-black text-primary">#{position}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsSuccess(false)} 
                  className="text-slate-400 hover:text-primary underline text-sm"
                >
                  Modifier mon inscription
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};