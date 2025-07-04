import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "../../components/HeroSection";
import StepsSection from "../../components/steps-section";
import TestimonialsSection from "../../components/testimonials-section";
import CtaSection from "../../components/cta-section";
import Footer from "../../components/footer";
import FeaturesShowcaseSection from "../../components/features-showcase-section";
import ProjectExamplesSection from "../../components/project-examples-section";
import FaqSection from "../../components/faq-section";

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const LandingPage = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className='w-full min-h-screen flex flex-col'
    >
      <HeroSection />
      <StepsSection />
      <FeaturesShowcaseSection/>
      <ProjectExamplesSection/>
      <FaqSection/>
      <CtaSection />
    </motion.div>
  );
};

export default LandingPage;