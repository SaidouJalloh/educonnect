import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Rocket, Gift, Lightbulb, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Tes avatars locaux
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";

const benefits = [
  { icon: Rocket, text: "Accès anticipé à EduConnect" },
  { icon: Gift, text: "Gratuité totale pendant le test" },
  { icon: Lightbulb, text: "Influence sur le développement" },
];

// Ton URL Google Script pour recevoir les mails
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzb7jBkGwOa6Pkctzd1oy8Sjq7rZ19UNCOt8EMzI1aWdv0FSV2Yal_Euu-rIRhrbhkcYA/exec";

export const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [position, setPosition] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Validation de l'email
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

    // 1. Règles de validation
    if (!validateEmail(normalizedEmail)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    if (!consent) {
      toast.error("Veuillez accepter la politique de confidentialité");
      return;
    }

    // 2. Règle Anti-doublon (Vérification locale)
    const savedData = localStorage.getItem("educonnect_waitlist");
    if (savedData) {
      const { email: savedEmail } = JSON.parse(savedData);
      if (savedEmail.toLowerCase() === normalizedEmail) {
        setError("Vous êtes déjà inscrit avec cet email !");
        toast.info("Déjà inscrit !");
        return;
      }
    }

    setIsLoading(true);

    try {
      // 3. Envoi au Google Script (pour recevoir l'email)
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          timestamp: new Date().toISOString(),
          source: "waitlist_lovable"
        }),
      });

      // Gestion de la position
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
      {/* Décorations d'arrière-plan */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4 animate-pulse" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Contenu de gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <span className="inline-block bg-white text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Accès Anticipé
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Rejoins la liste d'attente
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-lg">
              EduConnect arrive bientôt ! Inscris-toi pour tester la plateforme en priorité. Places limitées.
            </p>

            {/* Social Proof (Avatars locaux) */}
            <div className="rounded-2xl p-4 mb-10 flex items-center gap-4 bg-white shadow-xl border-2 border-primary/20 w-fit">
              <div className="flex -space-x-2">
                {[avatar1, avatar2, avatar3, avatar4].map((src, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                    <img src={src} alt="Étudiant" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-slate-900 font-semibold">
                <strong className="text-xl text-primary">+100</strong> inscrits 🔥
              </p>
            </div>

            {/* Bénéfices */}
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                  <benefit.icon className="w-6 h-6 text-white" />
                  <span className="font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Formulaire de Droite */}
          <div className="relative">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-2 border-white/50">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Teste EduConnect</h3>
                <p className="text-slate-500 mb-8">Réserve ta place en 10 secondes</p>

                <div className="space-y-6">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      className={cn(
                        "h-14 rounded-2xl border-2 px-6 text-lg transition-all text-slate-900",
                        error ? "border-red-500 bg-red-50" : "border-slate-100 focus:border-primary"
                      )}
                      required
                    />
                    {error && <p className="text-red-500 text-xs mt-2 font-medium">⚠️ {error}</p>}
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox id="consent" checked={consent} onCheckedChange={(c) => setConsent(c as boolean)} className="mt-1" />
                    <label htmlFor="consent" className="text-sm text-slate-500 leading-snug cursor-pointer">
                      J'accepte de recevoir des nouvelles d'EduConnect.
                    </label>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full h-14 rounded-2xl text-lg font-bold group bg-primary text-white">
                    {isLoading ? "Vérification..." : "Rejoindre la liste d'attente"}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            ) : (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[2.5rem] p-12 text-center shadow-2xl">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Position réservée !</h3>
                <div className="bg-slate-50 p-8 rounded-3xl border-2 border-primary/10 mb-6 text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Ta place</p>
                  <span className="text-6xl font-black text-primary">#{position}</span>
                </div>
                <button onClick={() => { localStorage.removeItem("educonnect_waitlist"); setIsSuccess(false); }} className="text-slate-400 hover:text-primary underline">
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