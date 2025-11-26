'use client';

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  return (
    <motion.div
      // Konfigurasi Awal (Hilang & Turun sedikit)
      initial={{ opacity: 0, y: 50 }}
      // Konfigurasi Saat Masuk Layar (Muncul & Naik ke posisi normal)
      whileInView={{ opacity: 1, y: 0 }}
      // Durasi & Easing animasi
      transition={{ duration: 0.8, ease: "easeOut" }}
      // Hanya animasi sekali saja saat pertama kali muncul
      viewport={{ once: true, margin: "-100px" }}
      
      className={className}
    >
      {children}
    </motion.div>
  );
}