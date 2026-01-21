import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#probleme", label: "Pourquoi" },
  { href: "#solution", label: "Solution" },
  { href: "#cible", label: "Pour qui" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO ET TEXTE EDUCONNECT CONFORMES À L'IMAGE */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.01 }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {/* Logo Image */}
            <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Logo EduConnect" 
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Texte EduConnect à côté du logo */}
            <span className="font-display text-2xl font-bold tracking-tight text-[#004aad]">
              EduConnect
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <nav>
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-700 hover:text-[#004aad] font-medium transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#004aad] transition-all group-hover:w-full" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <Button
              onClick={() => scrollToSection("#waitlist")}
              className="rounded-full px-8 bg-[#004aad] hover:bg-blue-700 font-bold shadow-md transition-all h-11"
            >
              Rejoindre la liste
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu avec AnimatePresence */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-6 border-t border-gray-100 pt-6 overflow-hidden bg-white rounded-2xl px-4 shadow-xl"
            >
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="w-full text-left py-2 text-gray-800 hover:text-[#004aad] text-lg font-medium transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="pt-4 border-t border-gray-50">
                  <Button
                    onClick={() => scrollToSection("#waitlist")}
                    className="w-full h-12 rounded-xl bg-[#004aad] font-bold text-lg"
                  >
                    Rejoindre la liste
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};