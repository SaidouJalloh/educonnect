import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: "Veuillez remplir tous les champs", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const submissionData = new FormData();
    submissionData.append("access_key", "edcda68c-0a48-4820-b9d7-d3b436d144f7");
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("message", formData.message);
    submissionData.append("subject", `Nouveau message de ${formData.name} - EduConnect`);
    submissionData.append("from_name", "EduConnect Landing Page");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        toast({ 
          title: "Message envoyé ! 🚀", 
          description: "Nous avons bien reçu votre demande sur educonnectafrika@gmail.com" 
        });
      } else {
        throw new Error("Erreur API");
      }
    } catch (error) {
      toast({ 
        title: "Oups !", 
        description: "Une erreur est survenue. Vérifiez votre connexion.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations — taille réduite sur mobile pour éviter le débordement */}
      <div className="absolute top-20 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-primary/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 px-2">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Send className="w-4 h-4" />
            Contactez-nous
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            // FIX: text-3xl sur mobile au lieu de text-4xl qui débordait
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight break-words"
          >
            Parlons de votre <span className="text-primary">avenir</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto"
          >
            Une question sur nos services ? Un projet de partenariat ? Notre équipe est à votre écoute.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 items-stretch max-w-5xl mx-auto">
          
          {/* LEFT — Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {!isSuccess ? (
              <form
                onSubmit={handleSubmit}
                // FIX: p-5 sm:p-8 au lieu de p-8 fixe
                className="bg-card border border-border rounded-3xl p-5 sm:p-8 flex flex-col gap-4 sm:gap-5 h-full"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nom complet
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-base"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl py-5 sm:py-6 text-base font-semibold"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-card border border-primary/20 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center h-full gap-4"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Message bien reçu !</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Merci <strong>{formData.name}</strong> ! Votre demande a été transmise avec succès.
                  Nous reviendrons vers vous sur <strong>{formData.email}</strong> très bientôt.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="mt-4"
                >
                  Envoyer un autre message
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT — Coordonnées */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-3xl blur-2xl opacity-20 scale-95 pointer-events-none" />
            {/* FIX: p-6 sm:p-10 au lieu de p-10 fixe */}
            <div className="relative bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 sm:p-10 text-white overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">
                  Nos coordonnées
                </h3>
                <p className="text-white/80 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  N'hésitez pas à nous contacter directement via l'un de ces canaux.
                </p>

                <div className="space-y-3 sm:space-y-5">
                  <a
                    href="mailto:educonnectafrika@gmail.com"
                    className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-white/60">Email</p>
                      {/* FIX: text-sm + break-all pour éviter le débordement de l'adresse email */}
                      <p className="font-semibold text-white text-sm break-all">
                        educonnectafrika@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+221785365248"
                    className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-white/60">Téléphone</p>
                      <p className="font-semibold text-white text-sm sm:text-base">+221 78 536 52 48</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-white/60">Localisation</p>
                      <p className="font-semibold text-white text-sm sm:text-base">Dakar, Sénégal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};