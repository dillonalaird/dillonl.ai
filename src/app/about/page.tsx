import AboutContent from "@/app/_components/about-content";
import SectionShell from "@/app/_components/section-shell";

export default function AboutPage() {
  return (
    <SectionShell active="about">
      <AboutContent />
    </SectionShell>
  );
}
