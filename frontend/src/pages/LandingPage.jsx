import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const LandingPage = () => (
  <div className="min-h-screen bg-base-100 text-base-content">
    <HeroSection />
    <FeaturedProducts />
    <Testimonials />
    <FAQ />
    <Footer />
  </div>
);

export default LandingPage;
