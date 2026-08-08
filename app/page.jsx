import { Hero } from "@/components/sections/hero";
import { TechTicker } from "@/components/tech-ticker";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechTicker />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
