import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Rocket, Gift, Lightbulb, CheckCircle, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
  
  // États pour la gestion des erreurs
  const [error, setError] = useState<string | null>(null);

  // 1. Validation syntaxique de l'email
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    const savedData = localStorage.getItem("educonnect_waitlist");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setPosition(parsedData.position);
      setIsSuccess(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const normalizedEmail = email.trim().toLowerCase();

    // 2. Vérification de la validité
    if (!validateEmail(normalizedEmail)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    if (!consent) {
      toast.error("Veuillez accepter la politique de confidentialité");
      return;
    }

    // 3. Vérification des doublons (Logique demandée)
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
    <section id="waitlist" className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Contenu de gauche */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Rejoins l'élite de demain
            </h2>
            <div className="space-y-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-5 bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <benefit.icon className="w-7 h-7 text-white" />
                  <span className="text-lg font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire (Droite) */}
          <div className="relative">
            {!isSuccess ? (
              <form 
                onSubmit={handleSubmit} 
                className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-white/20"
              >
                <p className="text-gray-400 font-medium mb-8">Réserve ta place en 10 secondes</p>

                <div className="space-y-6">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null); // Efface l'erreur quand on tape
                      }}
                      className={cn(
                        "h-14 rounded-2xl border-2 px-6 text-lg transition-all duration-200",
                        error 
                          ? "border-red-500 bg-red-50/50 focus-visible:ring-red-500 text-red-900" 
                          : "border-gray-100 focus-visible:ring-primary"
                      )}
                    />
                    
                    {/* Affichage de l'erreur style Image */}
                    <AnimatePresence>
                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 mt-3 text-red-500 font-medium text-sm"
                        >
                          <span role="img" aria-label="success" className="text-base">✅</span>
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="consent" 
                      checked={consent} 
                      onCheckedChange={(v) => setConsent(v as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-500 leading-snug cursor-pointer">
                      J'accepte de recevoir des informations sur EduConnect.
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg hover:shadow-primary/20 transition-all"
                  >
                    {isLoading ? "Vérification..." : "Rejoindre la liste d'attente"}
                  </Button>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-12 rounded-[2.5rem] text-center shadow-2xl border-b-8 border-primary"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirmation réussie !</h3>
                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-primary/10 mb-6">
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-widest font-bold">Ta place est réservée</p>
                  <span className="text-5xl font-black text-primary">#{position}</span>
                </div>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-gray-400 text-sm hover:text-primary underline transition-colors"
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