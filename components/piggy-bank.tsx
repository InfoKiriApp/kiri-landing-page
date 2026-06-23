"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function PiggyBank() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full max-w-xs aspect-square"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full max-w-xs mx-auto"
      >
        <Image
          src="/images/piggy.png"
          alt="Hucha de cerdito con monedas de oro"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </motion.div>
    </motion.div>
  )
}
