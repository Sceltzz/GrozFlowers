import { Advantages } from './components/Advantages';
import { Catalog } from './components/Catalog';
import { FeaturedConfigurator } from './components/FeaturedConfigurator';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HowToOrder } from './components/HowToOrder';
import { Navbar } from './components/Navbar';
import { SeamTransition } from './components/SeamTransition';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <Hero />
      <SeamTransition src="/seams/hero-featured.jpg" />
      <FeaturedConfigurator />
      <Catalog />
      <Advantages />
      <HowToOrder />
      <Footer />
    </>
  );
}
