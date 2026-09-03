import { Advantages } from './components/Advantages';
import { Catalog } from './components/Catalog';
import { FeaturedConfigurator } from './components/FeaturedConfigurator';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HowToOrder } from './components/HowToOrder';
import { Navbar } from './components/Navbar';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedConfigurator />
      <Catalog />
      <Advantages />
      <HowToOrder />
      <Footer />
    </>
  );
}
