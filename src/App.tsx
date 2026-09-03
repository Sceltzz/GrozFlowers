import { Advantages } from './components/Advantages';
import { Catalog } from './components/Catalog';
import { FeaturedConfigurator } from './components/FeaturedConfigurator';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HowToOrder } from './components/HowToOrder';
import { Navbar } from './components/Navbar';
import { SeamGlow } from './components/SeamGlow';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <Hero />
      <SeamGlow variant="heroToCream" />
      <FeaturedConfigurator />
      <Catalog />
      <SeamGlow variant="creamToMoss" />
      <Advantages />
      <SeamGlow variant="mossToCream" />
      <HowToOrder />
      <Footer />
    </>
  );
}
